<?php
require 'db.php';

// List of allowed origins
$allowed_origins = [
    'http://localhost:5173',
    'https://yogaposesapp.netlify.app', // Add other allowed origins here
];

// Get the origin of the incoming request
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

// Check if the origin is allowed
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("HTTP/1.1 403 Forbidden");
    echo "Invalid requester.";
    exit;
}


header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if (!$username || !$password) {
    echo json_encode(['error' => 'Please provide both username and password']);
    exit;
}

// Initialize the PDO connection
$pdo = getDbConnection();  // This uses function to get the PDO object

if (!$pdo) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

$stmt = $pdo->prepare("SELECT id, username, password FROM users WHERE username=?");
$stmt->execute([$username]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password'])) {
    // Generate a unique session token
    $session_token = bin2hex(random_bytes(32));

    // Set session cookie options
    ini_set('session.cookie_samesite', 'None');
    ini_set('session.cookie_secure', 'true');

    // Set cookies
    $expiry = time() + (30 * 24 * 60 * 60);  // Cookie expires in 30 days
    setcookie('user_id', $user['id'], $expiry, '/', '', false, false);
    setcookie('username', $user['username'], $expiry, '/', '', false, false);
    setcookie('session_token', $session_token, $expiry, '/', '', false, false);

    // Store the session token in the database 
    $stmt = $pdo->prepare("UPDATE users SET session_token = ? WHERE id = ?");
    $stmt->execute([$session_token, $user['id']]);

    echo json_encode([
        'success' => true,
        'user' => [
            'id' => $user['id'],
            'username' => $user['username']
        ]
    ]);
} else {
    echo json_encode(['error' => 'Invalid username or password']);
}
