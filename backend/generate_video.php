<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'generate_audio.php';

function fetchPoses($poseNames) {
    $poses = [];
    foreach ($poseNames as $pose) {
        $url = "https://yoga-api-nzy4.onrender.com/v1/poses?name=" . urlencode($pose);
        $response = false;
        $retryCount = 0;
        while ($response === false && $retryCount < 3) {
            $response = file_get_contents($url);
            if ($response === false) {
                error_log('Failed to fetch pose: ' . $pose . ' - Retry: ' . ($retryCount + 1));
                $retryCount++;
                sleep(1); // Wait for 1 second before retrying
            }
        }
        
        if ($response === false) {
            error_log('Failed to fetch pose after retries: ' . $pose);
            return ['error' => 'Failed to fetch pose: ' . $pose];
        }
        
        $poseData = json_decode($response, true);
        if (json_last_error() === JSON_ERROR_NONE && !empty($poseData)) {
            if (isset($poseData[0])) {
                $poses[] = $poseData[0]; // Adjusting to match the structure of the API response
            } else {
                $poses[] = $poseData; // Handle case where poseData is not wrapped in an array
            }
        } else {
            error_log('Invalid response for pose: ' . $pose . ' - Response: ' . $response);
            return ['error' => 'Invalid response for pose: ' . $pose];
        }
    }
    return $poses;
}

function createFrames($poses) {
    $framePaths = [];
    if (!is_dir('frames')) {
        mkdir('frames', 0777, true);
    }
    foreach ($poses as $index => $pose) {
        // Create pose frame
        $imagePath = sprintf('frames/pose%03d.png', $index);
        $imageContent = file_get_contents($pose['url_png']);
        if ($imageContent === FALSE) {
            error_log('Failed to fetch image for pose: ' . $pose['name']);
            return ['error' => 'Failed to fetch image for pose: ' . $pose['name']];
        }
        file_put_contents($imagePath, $imageContent);
        if (!file_exists($imagePath)) {
            error_log('Failed to save pose image: ' . $imagePath);
            return ['error' => 'Failed to save pose image'];
        }
        $framePaths[] = $imagePath;
    }
    return $framePaths;
}

function generateVideo($framePaths) {
    if (!is_dir('output')) {
        mkdir('output', 0777, true);
    }
    $frameRate = 1;
    $uniqueId = uniqid();
    $videoPath = 'output/yoga_sequence_' . $uniqueId . '.mp4';
    $command = "ffmpeg -y -framerate $frameRate -pattern_type glob -i 'frames/pose*.png' $videoPath";
    shell_exec($command);
    if (!file_exists($videoPath)) {
        error_log('Failed to generate video at: ' . $videoPath);
        return ['error' => 'Failed to generate video'];
    }
    return $videoPath;
}


// Generate video with audio function

// function generateVideoWithAudio($framePaths, $poseDescriptions) {
//     if (!is_dir('output')) {
//         mkdir('output', 0777, true); 
// }

// if (!is_dir('audio')) {
//     mkdir('audio', 0777, true);
// }

// $audioFiles = [];

// // Generate audio for each pose description
// $poseDescriptions = []; // Assign an empty array to $poseDescriptions
// foreach ($poseDescriptions as $index => $description) {
//     $audioFilePath = "audio/transition-{$index}.mp3";
//     $success = generatePlayHTAudio($description, $audioFilePath);
//     if ($success) {
//         $audioFiles[] = $audioFilePath;
//     } else {
//         error_log("Failed to generate audio for description: " . $description);
//     }
// }

// if (count($audioFiles) === 0) {
//     error_log('No audio files generated.');
//     return ['error' => 'No audio files generated.'];
// }

// $frameRate = 1;
// $uniqueId = uniqid();
// $videoPath = 'output/yoga_sequence_' . $uniqueId . '.mp4';

// $ffmpegCommand = "ffmpeg -y -framerate $frameRate -pattern_type glob -i 'frames/pose*.png'";

// foreach ($audioFiles as $index => $audioFile) {
//   ($ffmpegCommand . " -i $audioFile");
// }

// $audioInputCount = count($audioFiles);
// $ffmpegCommand .= " -filter_complex \"";
// for ($i = 0; $i < $audioInputCount; $i++) {
//     $ffmpegCommand .= "[$i:a]";
// }

// $ffmpegCommand .= "concat=n=$audioInputCount:v=0:a=1[a]\" -map 0:v -map \"[a]\" $videoPath";

// shell_exec($ffmpegCommand);

// if (!file_exists($videoPath)) {
//     error_log('Failed to generate video at: ' . $videoPath);
//     return ['error' => 'Failed to generate video'];
// }

// return $videoPath;
// }

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!isset($input['poses']) || !is_array($input['poses'])) {
        echo json_encode(['error' => 'Invalid input']);
        exit;
    }

    $poseNames = $input['poses'];
    $poses = fetchPoses($poseNames);

    if (isset($poses['error'])) {
        echo json_encode(['error' => $poses['error']]);
        exit;
    }

    $framePaths = createFrames($poses);
    if (isset($framePaths['error'])) {
        echo json_encode(['error' => $framePaths['error']]);
        exit;
    }


    $poseDescriptions = array_map(function($pose) {
        return $pose['english_name'] . " - " . $pose['pose_description'];
    }, $poses);

    // $videoPath = generateVideoWithAudio($framePaths, $poseDescriptions);
    // if (isset($videoPath['error'])) {
    //     echo json_encode(['error' => $videoPath['error']]);
    //     exit;
    // }

    $videoPath = generateVideo($framePaths);
    if (isset($videoPath['error'])) {
        echo json_encode(['error' => $videoPath['error']]);
        exit;
    }

    // Return the full URL
    $fullUrl = 'http://localhost:8001/' . $videoPath;
    echo json_encode(['videoPath' => $fullUrl]);

    foreach ($framePaths as $framePath) {
        unlink($framePath);

        // foreach ($audioFiles as $audioFile) {
        //     unlink($audioFile);
        // }
    }
}
?>
