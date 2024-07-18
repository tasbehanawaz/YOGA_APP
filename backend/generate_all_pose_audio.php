<?php
require 'generate_audio.php'; // This file should contain your generatePlayHTAudio function
require 'db.php'; // Include the database connection script

function fetchAllPoses()
{
    $apiUrl = "https://yoga-api-nzy4.onrender.com/v1/poses";
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
        return json_decode($response, true);
    }
}

function saveAudioPathToDatabase($poseName, $audioPath)
{
    error_log("Saving audio path to database for pose: $poseName");
    $pdo = getDbConnection();
    if ($pdo === null) {
        error_log('Database connection failed');
        return false;
    }

    $stmt = $pdo->prepare("INSERT INTO yoga_pose_audio (pose_name, audio_path) VALUES (:pose_name, :audio_path)");
    $result = $stmt->execute(['pose_name' => $poseName, 'audio_path' => $audioPath]);
    if ($result) {
        error_log("Successfully saved audio path to database for: $poseName");
    } else {
        error_log("Failed to save audio path to database for: $poseName");
    }
    return $result;
}

function generateAudioForPose($poseDescription, $poseName)
{
    error_log("Generating audio for pose description: $poseName");
    if (!is_dir('audio')) {
        mkdir('audio', 0777, true);
        error_log('Created audio directory');
    }

    $audioFilePath = "audio/{$poseName}.mp3";
    $retryCount = 0;
    $maxRetries = 3;

    while ($retryCount < $maxRetries) {
        $success = generateOpenAIAudio($poseDescription, $audioFilePath);
        if ($success) {
            error_log("Successfully generated audio for description: $poseName");
            return $audioFilePath;
        } else {
            error_log("Failed to generate audio for description: $poseName - Retry: " . ($retryCount + 1));
            $retryCount++;
            sleep(1); // Wait for 1 second before retrying
        }
    }

    error_log("Failed to generate audio after retries for description: $poseName");
    return false;
}

function generateAndSaveAudioForAllPoses()
{
    $poses = fetchAllPoses();
    if (json_last_error() !== JSON_ERROR_NONE || empty($poses)) {
        error_log('Failed to fetch all poses');
        return;
    }

    foreach ($poses as $index => $pose) {
        // if ($index > 5) {
        //     break;
        // }
        $poseName = $pose['english_name'];
        $poseDescription = $pose['english_name'] . " - " . $pose['pose_description'];
        $audioFilePath = generateAudioForPose($poseDescription, $poseName);


        if ($audioFilePath !== false) {
            saveAudioPathToDatabase($poseName, $audioFilePath);
        } else {
            error_log("Skipping pose: $poseName due to audio generation failure");
        }
    }
}

// Run the function in smaller batches to avoid hitting API limits
generateAndSaveAudioForAllPoses();
