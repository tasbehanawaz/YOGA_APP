<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");

require 'db.php';  // This imports the getDbConnection function

// Check if the user is logged in by verifying the cookies
if (isset($_COOKIE['user_id']) && isset($_COOKIE['session_token'])) {
    $user_id = $_COOKIE['user_id'];
    $session_token = $_COOKIE['session_token'];

    // Initialize the PDO connection
    $pdo = getDbConnection();

    if ($pdo) {
        // Remove the session token from the database
        $stmt = $pdo->prepare("UPDATE users SET session_token = NULL WHERE id = ?");
        $stmt->execute([$user_id]);

        // Remove cookies by setting them to expire in the past
        setcookie('user_id', '', time() - 3600, '/', '', true, true);
        setcookie('username', '', time() - 3600, '/', '', true, true);
        setcookie('session_token', '', time() - 3600, '/', '', true, true);

        echo json_encode(['success' => 'Logged out successfully']);
    } else {
        echo json_encode(['error' => 'Database connection failed']);
    }
} else {
    echo json_encode(['error' => 'No active session found']);
}
?>