<?php
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
        $response = false;
        $retryCount = 0;
        while ($response === false && $retryCount < 3) {
            $response = fetchUrlWithCurl($url);
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

function fetchUrlWithCurl($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $response = curl_exec($ch);
    if (curl_errno($ch)) {
        error_log('cURL error: ' . curl_error($ch));
        $response = false;
    }
    curl_close($ch);
    return $response;
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
        error_log('Saved frame: ' . $imagePath);
    }
    return $framePaths;
}

function generateVideo($framePaths, $durations, $poseNames) {
    if (!is_dir('output')) {
        mkdir('output', 0777, true);
    }

    $uniqueId = uniqid();
    $videoPath = 'output/yoga_sequence_' . $uniqueId . '.mp4';

    // Create a list of inputs for ffmpeg
    $inputs = [];
    $audioInputs = [];
    foreach ($framePaths as $index => $framePath) {
        $duration = $durations[$index];
        $inputs[] = "-loop 1 -t $duration -i $framePath";
        
        // Add corresponding audio file
        $audioFilePath = 'audio/' . $poseNames[$index] . '.mp3';
        if (file_exists($audioFilePath)) {
            $audioInputs[] = "-i $audioFilePath";
        } else {
            error_log("Audio file not found: $audioFilePath");
            return ['error' => 'Audio file not found for pose: ' . $poseNames[$index]];
        }
    }
    $inputString = implode(' ', $inputs) . ' ' . implode(' ', $audioInputs);

    // Create a filter complex to concatenate frames
    $filterComplexParts = [];
    foreach ($framePaths as $index => $framePath) {
        $filterComplexParts[] = "[$index:v]scale=640:360:force_original_aspect_ratio=decrease,pad=640:360:(ow-iw)/2:(oh-ih)/2,setsar=1[v$index]";
    }
    $filterComplexString = implode(";", $filterComplexParts) . ";";

    // Audio concatenation
    $audioFilterComplexString = "";
    for ($i = 0; $i < count($framePaths); $i++) {
        $audioFilterComplexString .= "[" . ($i + count($framePaths)) . ":a]";
    }
    $audioFilterComplexString .= "concat=n=" . count($framePaths) . ":v=0:a=1[aout]";

    // Video concatenation
    $concatInputs = implode("", array_map(function($index) {
        return "[v$index]";
    }, array_keys($framePaths)));
    $filterComplexString .= "$concatInputs concat=n=" . count($framePaths) . ":v=1:a=0[vout]; $audioFilterComplexString";

    $command = "ffmpeg -y $inputString -filter_complex \"$filterComplexString\" " .
               "-map \"[vout]\" -map \"[aout]\" " .
               "-c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k " .
               "-pix_fmt yuv420p -movflags +faststart $videoPath 2>&1";
    
    $output = shell_exec($command);

    // Log the ffmpeg output for debugging
    error_log($output);

    if (!file_exists($videoPath)) {
        error_log('Failed to generate video at: ' . $videoPath);
        return ['error' => 'Failed to generate video'];
    }
    return $videoPath;
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!isset($input['poses']) || !is_array($input['poses']) || !isset($input['durations']) || !is_array($input['durations'])) {
        echo json_encode(['error' => 'Invalid input']);
        exit;
    }

    $poseNames = $input['poses'];
    $durations = $input['durations'];
    if (count($poseNames) !== count($durations)) {
        echo json_encode(['error' => 'Poses and durations count mismatch']);
        exit;
    }

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

    $videoPath = generateVideo($framePaths, $durations, $poseNames);
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
