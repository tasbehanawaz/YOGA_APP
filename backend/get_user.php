<?php
require 'cors.php';


header('Content-Type: application/json');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require 'db.php';  // This imports the getDbConnection function

// Check if the user is logged in by verifying the cookies
if (isset($_COOKIE['user_id']) && isset($_COOKIE['session_token'])) {
    $user_id = $_COOKIE['user_id'];
    $session_token = $_COOKIE['session_token'];

    // Initialize the PDO connection
    $pdo = getDbConnection();

    if ($pdo) {
        // Fetch the user from the database
        $stmt = $pdo->prepare("SELECT id, username, membership_status FROM users WHERE id = ? AND session_token = ?");
        $stmt->execute([$user_id, $session_token]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            echo json_encode([
                'id' => $user['id'],
                'username' => $user['username'],
                'membershipStatus' => $user['membership_status']
            ]);
        } else {
            echo json_encode(['error' => 'Invalid session']);
        }
    } else {
        echo json_encode(['error' => 'Database connection failed']);
    }
} else {
    echo json_encode(['error' => 'No active session found']);
}
