<?php
session_start();
require 'db.php';  // This imports the getDbConnection function

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if (!$username || !$password) {
    echo json_encode(['error' => 'Please provide both username and password']);
    exit;
}

// Initialize the PDO connection
$pdo = getDbConnection();  // This uses your function to get the PDO object

if (!$pdo) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

$stmt = $pdo->prepare("SELECT id, username, password FROM users WHERE username=?");
$stmt->execute([$username]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user_id'] = $user['id'];  // Set user session
    $_SESSION['username'] = $user['username'];  // Optionally store the username in the session
    echo json_encode([
        'success' => 'Logged in successfully',
        'message' => 'Redirecting...',  // Custom message for redirecting
        'username' => $user['username']  // Include username in the response
    ]);
} else {
    echo json_encode(['error' => 'Invalid username or password']);
}
?>