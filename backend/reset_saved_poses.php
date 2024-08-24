<?php
require 'cors.php';
require 'db.php';

header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$db = getDbConnection();

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Clear all saved poses
$sql = "DELETE FROM yoga_poses";
$stmt = $db->prepare($sql);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'All saved poses have been reset.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to reset saved poses.']);
}
