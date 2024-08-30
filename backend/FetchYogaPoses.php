<?php
require 'cors.php';
require 'db.php';

header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

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

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['duration'])) {
    $duration = intval($_GET['duration']);
    $poses = fetchRandomPosesForDuration($duration);
    echo json_encode(['status' => 'success', 'data' => $poses]);
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

function fetchRandomPosesForDuration($duration) {
    $poses = fetchAllYogaPoses();
    $totalPoses = count($poses);

    // Number of poses to select based on session duration
    $numPoses = match ($duration) {
        3 => 3,   // 3 poses for a 3-minute session
        10 => 5,  // 5 poses for a 10-minute session
        20 => 10, // 10 poses for a 20-minute session
        default => 3,
    };

    // Randomly shuffle and select the required number of poses
    shuffle($poses);
    return array_slice($poses, 0, $numPoses);
}

function fetchAllYogaPoses()
{
    // Fetch poses from the external API
    $apiUrl = "https://yoga-api-nzy4.onrender.com/v1/poses";
    return makeApiRequest($apiUrl);
}

function makeApiRequest($apiUrl)
{
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
        throw new Exception("cURL Error #:" . $err);
    }

    $data = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("JSON decoding error: " . json_last_error_msg());
    }

    return $data ?? [];
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
