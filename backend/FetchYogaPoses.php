<?php
// This script fetches yoga pose details based on the provided pose name.

require 'db.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Handle GET requests instead of POST
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!isset($_GET['poseName'])) {
        echo json_encode(['error' => 'Pose name not provided']);
        exit;
    }

    $poseName = $_GET['poseName'];
    $poseData = fetchYogaPoseByName($poseName);

    if (!empty($poseData)) {
        echo json_encode($poseData);
    } else {
        echo json_encode(['error' => 'Pose not found']);
    }
} else {
    echo json_encode(['error' => 'Invalid request method']);
}

function fetchYogaPoseByName($poseName)
{
    $apiUrl = "https://yoga-api-nzy4.onrender.com/v1/poses?name=" . urlencode($poseName);

    $curl = curl_init();

    curl_setopt_array($curl, [
        CURLOPT_URL => $apiUrl,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
    ]);

    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);

    if ($err) {
        error_log("cURL Error #:" . $err);
        return [];
    } else {
        $data = json_decode($response, true);
        return $data[0] ?? $data;
    }
}

function saveYogaPoseToDb($poseData)
{
    if (!isset($poseData['english_name']) || !isset($poseData['pose_description']) || !isset($poseData['url_png'])) {
        error_log("Invalid pose data");
        return;
    }

    $db = getDbConnection();
    if ($db === null) {
        return;
    }

    // Check if the pose already exists
    $checkSql = "SELECT COUNT(*) FROM yoga_poses WHERE name = :name";
    $checkStmt = $db->prepare($checkSql);
    $checkStmt->execute([':name' => $poseData['english_name']]);
    $exists = $checkStmt->fetchColumn() > 0;

    if (!$exists) {
        $sql = "INSERT INTO yoga_poses (name, description, image_url) VALUES (:name, :description, :image_url)";
        $stmt = $db->prepare($sql);
        $stmt->execute([
            ':name' => $poseData['english_name'],
            ':description' => $poseData['pose_description'],
            ':image_url' => $poseData['url_png']
        ]);
    }
}
?>
