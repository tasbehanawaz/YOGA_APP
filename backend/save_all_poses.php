<?php
require 'cors.php';
require 'db.php';

header("Content-Type: application/json; charset=UTF-8");

if (php_sapi_name() == "cli" || $_SERVER['REQUEST_METHOD'] === 'GET') {
    $difficultyLevels = ['beginner', 'intermediate', 'advanced'];
    $poses = [];

    foreach ($difficultyLevels as $level) {
        $levelPoses = fetchAllYogaPosesByLevel($level);
        if (!empty($levelPoses)) {
            foreach ($levelPoses as &$pose) {
                $pose['difficulty_level'] = ucfirst($level); // Capitalize the first letter of the level
                savePoseToDatabase($pose);
            }
            $poses = array_merge($poses, $levelPoses);
        }
    }

    echo json_encode(['success' => 'Poses saved successfully']);
} else {
    echo json_encode(['error' => 'Invalid request']);
}

function fetchAllYogaPosesByLevel($level)
{
    $apiUrl = "https://yoga-api-nzy4.onrender.com/v1/poses?level=" . $level;

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
        return $data['poses'] ?? [];
    }
}

function savePoseToDatabase($pose)
{
    $pdo = getDbConnection();
    if ($pdo === null) {
        error_log('Database connection failed');
        return false;
    }

    $stmt = $pdo->prepare("INSERT INTO detailed_yoga_poses (english_name, sanskrit_name_adapted, sanskrit_name, translation_name, pose_description, pose_benefits, url_png, difficulty_level) VALUES (:english_name, :sanskrit_name_adapted, :sanskrit_name, :translation_name, :pose_description, :pose_benefits, :url_png, :difficulty_level)");

    $stmt->execute([
        'english_name' => $pose['english_name'],
        'sanskrit_name_adapted' => $pose['sanskrit_name_adapted'],
        'sanskrit_name' => $pose['sanskrit_name'],
        'translation_name' => $pose['translation_name'],
        'pose_description' => $pose['pose_description'],
        'pose_benefits' => $pose['pose_benefits'],
        'url_png' => $pose['url_png'],
        'difficulty_level' => $pose['difficulty_level']
    ]);

    return $stmt->rowCount() > 0;
}
