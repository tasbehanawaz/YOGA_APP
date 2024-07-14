<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'generate_audio.php';
require 'db.php'; // Include the database connection script

function fetchPose($poseName) {
    $url = "https://yoga-api-nzy4.onrender.com/v1/poses?name=" . urlencode($poseName);
    $response = false;
    $retryCount = 0;
    while ($response === false && $retryCount < 3) {
        $response = file_get_contents($url);
        if ($response === false) {
            error_log('Failed to fetch pose: ' . $poseName . ' - Retry: ' . ($retryCount + 1));
            $retryCount++;
            sleep(1); // Wait for 1 second before retrying
        }
    }
    
    if ($response === false) {
        error_log('Failed to fetch pose after retries: ' . $poseName);
        return ['error' => 'Failed to fetch pose: ' . $poseName];
    }
    
    $poseData = json_decode($response, true);
    if (json_last_error() === JSON_ERROR_NONE && !empty($poseData)) {
        if (isset($poseData[0])) {
            return $poseData[0]; // Adjusting to match the structure of the API response
        } else {
            return $poseData; // Handle case where poseData is not wrapped in an array
        }
    } else {
        error_log('Invalid response for pose: ' . $poseName . ' - Response: ' . $response);
        return ['error' => 'Invalid response for pose: ' . $poseName];
    }
}

function fetchAudioPathFromDatabase($poseName) {
    $pdo = getDbConnection();
    if ($pdo === null) {
        return null;
    }

    $stmt = $pdo->prepare("SELECT audio_path FROM yoga_pose_audio WHERE pose_name = :pose_name LIMIT 1");
    $stmt->execute(['pose_name' => $poseName]);
    return $stmt->fetchColumn();
}

function saveAudioPathToDatabase($poseName, $audioPath) {
    $pdo = getDbConnection();
    if ($pdo === null) {
        return false;
    }

    $stmt = $pdo->prepare("INSERT INTO yoga_pose_audio (pose_name, audio_path) VALUES (:pose_name, :audio_path)");
    return $stmt->execute(['pose_name' => $poseName, 'audio_path' => $audioPath]);
}

function generateAudioForPose($index, $poseDescription, $poseName) {
    if (!is_dir('audio')) {
        mkdir('audio', 0777, true);
    }

    $audioFilePath = "audio/{$index}-{$poseName}.mp3";
    $success = generateOpenAIAudio($poseDescription, $audioFilePath);
    if ($success) {
        return $audioFilePath;
    } else {
        error_log("Failed to generate audio for description: " . $poseDescription);
        return false;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!isset($input['pose']) || !is_string($input['pose'])) {
        echo json_encode(['error' => 'Invalid input']);
        exit;
    }

    $poseName = $input['pose'];
    // $audioPath = fetchAudioPathFromDatabase($poseName);

    // if ($audioPath) {
    //     $fullUrl = 'http://localhost:8001/' . $audioPath;
    //     echo json_encode(['audioPath' => $fullUrl]);
    //     exit;
    // }

    $pose = fetchPose($poseName);

    if (isset($pose['error'])) {
        echo json_encode(['error' => $pose['error']]);
        exit;
    }

    
    $poseDescription = $pose['english_name'] . " - " . $pose['pose_description'];
    $audioFilePath = generateAudioForPose(0, $poseDescription, $poseName);

    if ($audioFilePath === false) {
        echo json_encode(['error' => 'Failed to generate audio']);
        exit;
    }

    saveAudioPathToDatabase($poseName, $audioFilePath);
    $fullUrl = 'http://localhost:8001/' . $audioFilePath;
    echo json_encode(['audioPath' => $fullUrl]);
}
?>
