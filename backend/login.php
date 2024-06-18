/**
login form
*/


<?php
session_start();
require 'db.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if (!$username || !$password) {
    echo json_encode(['error' => 'Please provide both username and password']);
    exit;
}

$stmt = $pdo->prepare("SELECT id, password FROM users WHERE username=?");
$stmt->execute([$username]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user_id'] = $user['id']; // Set user session
    echo json_encode(['success' => 'Logged in successfully']);
} else {
    echo json_encode(['error' => 'Invalid username or password']);
}
?>

