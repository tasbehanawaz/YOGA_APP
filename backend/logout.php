<?php

require 'cors.php';
require 'db.php';

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Initialize the PDO connection
$pdo = getDbConnection();

if (!$pdo) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Assume that the user_id and session_token are stored in cookies
$user_id = $_COOKIE['user_id'] ?? '';
$session_token = $_COOKIE['session_token'] ?? '';

if (!$user_id || !$session_token) {
    echo json_encode(['error' => 'User not logged in']);
    exit;
}

// Clear the session token in the database
$stmt = $pdo->prepare("UPDATE users SET session_token = NULL WHERE id = ?");
$stmt->execute([$user_id]);

// Clear cookies
setcookie('user_id', '', time() - 3600, '/', '', false, false);
setcookie('username', '', time() - 3600, '/', '', false, false);
setcookie('session_token', '', time() - 3600, '/', '', false, false);

echo json_encode(['success' => true]);

