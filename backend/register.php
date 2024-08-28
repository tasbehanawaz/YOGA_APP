<?php
require 'cors.php';
require 'db.php';

header("Content-Type: application/json; charset=UTF-8");

// Get database connection
$pdo = getDbConnection();

$username = $_POST['username'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (!$username || !$email || !$password) {
    echo json_encode(['error' => 'Please provide all required fields']);
    exit;
}

// Check if user or email already exists
$stmt = $pdo->prepare("SELECT id FROM users WHERE username=? OR email=?");
$stmt->execute([$username, $email]);
if ($stmt->fetch()) {
    echo json_encode(['error' => 'Username or email already exists']);
    exit;
}

// Hash password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Insert new user
$stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
$result = $stmt->execute([$username, $email, $hashed_password]);

if ($result) {
    echo json_encode(['success' => 'User registered successfully']);
} else {
    echo json_encode(['error' => 'Registration failed']);
}
