<?php
// generate_video.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

function fetchPoses($poseNames) {
    $poses = [];
    foreach ($poseNames as $pose) {
        $url = "https://yoga-api-nzy4.onrender.com/v1/poses?name=" . urlencode($pose);
        $response = file_get_contents($url);
        if ($response === FALSE) {
            return ['error' => 'Failed to fetch pose: ' . $pose];
        }
        $poseData = json_decode($response, true);
        if (json_last_error() === JSON_ERROR_NONE) {
            $poses[] = $poseData;
        } else {
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
        $imagePath = 'frames/pose' . $index . '.png';
        $imageContent = file_get_contents($pose['url_png']);
        if ($imageContent === FALSE) {
            return ['error' => 'Failed to fetch image for pose: ' . $pose['name']];
        }
        file_put_contents($imagePath, $imageContent);

        // Overlay text onto the image
        $text = $pose['english_name'] . "\n" . $pose['pose_description'] . "\n" . $pose['pose_benefits'];
        $outputImagePath = 'frames/pose_with_text' . $index . '.png';
        $command = "ffmpeg -i $imagePath -vf \"drawtext=text='$text':fontcolor=white:fontsize=24:box=1:boxcolor=black@0.5:boxborderw=5:x=10:y=10\" $outputImagePath";
        shell_exec($command);

        $framePaths[] = $outputImagePath;
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
    $command = "ffmpeg -y -framerate $frameRate -i frames/pose_with_text%d.png $videoPath";
    shell_exec($command);
    if (!file_exists($videoPath)) {
        return ['error' => 'Failed to generate video'];
    }
    return $videoPath;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!isset($input['poses'])) {
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
    }
}
?>
