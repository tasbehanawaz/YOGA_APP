<?php
// this script provides the poses in the search bar using the name of the pose and saves it to the database which includes: name and description. 
require 'db.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['poseName'])) {
    $poseName = $_GET['poseName'];
    $poseData = fetchYogaPoseByName($poseName);

    if (!empty($poseData)) {
        saveYogaPoseToDb($poseData);
    }

    echo json_encode($poseData);
} else {
    echo json_encode(['error' => 'Invalid request']);
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
    if (!isset($poseData['english_name']) || !isset($poseData['pose_description'])) {
        error_log("Invalid pose data");
        return;
    }

    $db = getDbConnection();
    if ($db === null) {
        return;
    }

    $sql = "INSERT INTO yoga_poses (name, description) VALUES (:name, :description)";
    $stmt = $db->prepare($sql);
    $stmt->execute([
        ':name' => $poseData['english_name'],
        ':description' => $poseData['pose_description']
    ]);
}