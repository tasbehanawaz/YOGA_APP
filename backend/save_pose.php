<?php
require 'db.php';

// Add CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$db = getDbConnection();

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

// Debugging line to check received data
file_put_contents('php://stderr', print_r($data, TRUE));

if (isset($data['english_name'], $data['pose_description'], $data['url_png'])) {
    $name = $data['english_name'];
    $description = $data['pose_description'];
    $imageUrl = $data['url_png'];

    // Prevent duplicates by checking if the pose already exists
    $stmt = $db->prepare("SELECT COUNT(*) FROM yoga_poses WHERE name = ?");
    $stmt->execute([$name]);
    if ($stmt->fetchColumn() > 0) {
        echo json_encode(['success' => false, 'message' => 'Pose already saved']);
        exit;
    }

    $sql = "INSERT INTO yoga_poses (name, description, image_url) VALUES (?, ?, ?)";
    $stmt = $db->prepare($sql);
    $stmt->execute([$name, $description, $imageUrl]);
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid pose data']);
}

?>
