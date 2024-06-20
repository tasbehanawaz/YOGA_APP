<?php
// generate_video.php

function fetchPoses($poseNames) {
    $poses = [];
    foreach ($poseNames as $pose) {
        $url = "https://yoga-api-nzy4.onrender.com/v1/poses?name=" . urlencode($pose);
        $response = file_get_contents($url);
        if ($response === FALSE) {
            // Handle error in fetching pose
            return ['error' => 'Failed to fetch pose: ' . $pose];
        }
        $poseData = json_decode($response, true);
        if (isset($poseData[0])) {
            $poses[] = $poseData[0];
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
        $imageContent = file_get_contents($pose['image_url']);
        if ($imageContent === FALSE) {
            return ['error' => 'Failed to fetch image for pose: ' . $pose['name']];
        }
        file_put_contents($imagePath, $imageContent);
        $framePaths[] = $imagePath;
    }
    return $framePaths;
}

function generateVideo($framePaths) {
    if (!is_dir('output')) {
        mkdir('output', 0777, true);
    }
    $frameRate = 1; // 1 frame per second
    $videoPath = 'output/yoga_sequence.mp4';
    $command = "ffmpeg -framerate $frameRate -i frames/pose%d.png $videoPath";
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

    echo json_encode(['videoPath' => $videoPath]);

    // Clean up frames after generating video
    foreach ($framePaths as $framePath) {
        unlink($framePath);
    }
}
?>
