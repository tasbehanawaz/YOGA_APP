<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['poseName'])) {
    $poseName = $_GET['poseName'];
    $poseData = fetchYogaPoseByName($poseName);
    echo json_encode($poseData);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['poses']) || !is_array($input['poses'])) {
        echo json_encode(['error' => 'Invalid input']);
        exit;
    }

    $poseNames = $input['poses'];
    $poseDetails = [];

    foreach ($poseNames as $poseName) {
        $poseData = fetchYogaPoseByName($poseName);
        if (!empty($poseData)) {
            $poseDetails[] = $poseData;
        }
    }

    echo json_encode($poseDetails);
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
