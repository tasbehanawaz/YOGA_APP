<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'generate_audio.php';

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

function generateAudioForPose($poseDescription, $index) {
    if (!is_dir('audio')) {
        mkdir('audio', 0777, true);
    }

    $audioFilePath = "audio/transition-{$index}.mp3";
    $success = generatePlayHTAudio($poseDescription, $audioFilePath);
    if ($success) {
        return $audioFilePath;
    } else {
        error_log("Failed to generate audio for description: " . $poseDescription);
        return false;
    }
}

// function generateAudioWithVideo($poseDescription, $videoPath, $audioPath) {
//     if (!is_dir('audio')) {
//         mkdir('audio', 0777, true);
//     }

//     $audioFilePath = "audio/transition-{$index}.mp3";
//     $success = generatePlayHTAudioWithVideo($poseDescription, $videoPath, $audioPath);
//     if ($success) {
//         return $audioFilePath;
//     } else {
//         error_log("Failed to generate audio for description: " . $poseDescription);
//         return false;
//     }
// }

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!isset($input['pose']) || !is_string($input['pose'])) {
        echo json_encode(['error' => 'Invalid input']);
        exit;
    }

    $poseName = $input['pose'];
    $pose = fetchPose($poseName);

    if (isset($pose['error'])) {
        echo json_encode(['error' => $pose['error']]);
        exit;
    }

    $poseDescription = $pose['english_name'] . " - " . $pose['pose_description'];
    $audioFilePath = generateAudioForPose($poseDescription, 0);


    
    if ($audioFilePath === false) {
        echo json_encode(['error' => 'Failed to generate audio']);
        exit;
    }

    $fullUrl = 'http://localhost:8001/' . $audioFilePath;
    echo json_encode(['audioPath' => $fullUrl]);
}
?>
