<?php

require_once 'db.php';

// Cross-Origin Resource Sharing (CORS) headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

function fetchPoses($poseNames)
{
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

function fetchUrlWithCurl($url)
{
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

// Define a sequence of poses, including the time and position for each pose
function definePoseSequence() {
    return [
        ['name' => 'Boat', 'duration' => 5, 'position' => '1'],
        ['name' => 'Bow', 'duration' => 5, 'position' => '2'],
        ['name' => 'Bridge', 'duration' => 5, 'position' => '3'],
        ['name' => 'Butterfly', 'duration' => 5, 'position' => '4'],
        ['name' => 'Camel', 'duration' => 5, 'position' => '5'],
        ['name' => 'Cat', 'duration' => 5, 'position' => '6'],
        ['name' => 'Corpse', 'duration' => 5, 'position' => '7'],
    ];
}

function createFrames($poses)
{
    $framePaths = [];
    if (!is_dir('frames')) {
        mkdir('frames', 0777, true);
    }
    foreach ($poses as $index => $pose) {
        // Create pose frame
        $imagePath = sprintf('frames/pose%03d.png', $index);
        $imageContent = file_get_contents($pose['url_png']);
        if ($imageContent === false) {
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

function generateVideo($poseSequence)
{
    if (!is_dir('output')) {
        mkdir('output', 0777, true);
    }

    // Generate a unique ID for the video
    $uniqueId = uniqid();
    $videoPath = 'output/yoga_sequence_' . $uniqueId . '.mp4';

    // Initialize arrays to store inputs, audio inputs, and filter complex parts
    $inputs = [];
    $audioInputs = [];
    $audioFilePaths = [];
    $filterComplexParts = [];

    // Process each pose in the sequence
    foreach ($poseSequence as $index => $pose) {
        $poseName = $pose['name'];
        $duration = $pose['duration'];

        // Path for the pose image frame
        $framePath = 'frames/pose' . str_pad($index, 3, '0', STR_PAD_LEFT) . '.png';

        // Path for the audio file
        $audioFilePath = 'audio/' . $poseName . '.mp3';
        if (file_exists($audioFilePath)) {
            // Set inputs for FFmpeg: loop the image for the duration of the audio
            $inputs[] = "-loop 1 -t $duration -i " . escapeshellarg($framePath);
            $audioInputs[] = "-i " . escapeshellarg($audioFilePath);
            $audioFilePaths[] = $audioFilePath;

            // FFmpeg filter to scale images and pad them
            $filterComplexParts[] = "[$index:v]scale=640:360:force_original_aspect_ratio=decrease,pad=640:360:(ow-iw)/2:(oh-ih)/2,setsar=1[v$index]";
        } else {
            error_log("Audio file not found: $audioFilePath");
            return ['error' => 'Audio file not found for pose: ' . $poseName];
        }
    }

    // Combine input strings for FFmpeg
    $inputString = implode(' ', $inputs) . ' ' . implode(' ', $audioInputs);

    // Create a filter complex to concatenate frames
    $filterComplexString = implode(";", $filterComplexParts) . ";";
    $audioFilterComplexString = "";

    // Add audio streams to the filter complex for concatenation
    for ($i = 0; $i < count($poseSequence); $i++) {
        $audioFilterComplexString .= "[" . ($i + count($poseSequence)) . ":a]";
    }
    $audioFilterComplexString .= "concat=n=" . count($poseSequence) . ":v=0:a=1[aout]";

    // Concatenate video streams
    $concatInputs = implode("", array_map(function ($index) {
        return "[v$index]";
    }, array_keys($poseSequence)));
    $filterComplexString .= "$concatInputs concat=n=" . count($poseSequence) . ":v=1:a=0[vout]; $audioFilterComplexString";

    // Construct the FFmpeg command
    $command = "ffmpeg -y $inputString -filter_complex \"$filterComplexString\" " .
        "-map \"[vout]\" -map \"[aout]\" " .
        "-c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k " .
        "-pix_fmt yuv420p -movflags +faststart $videoPath 2>&1";

    // Execute the FFmpeg command
    $output = shell_exec($command);
    error_log($output);

    // Check if the video was generated successfully
    if (!file_exists($videoPath)) {
        error_log('Failed to generate video at: ' . $videoPath);
        return ['error' => 'Failed to generate video'];
    }
    return $videoPath;
}

function savePoseSequenceToDatabase($poseSequence)
{
    // Connect to the database using the PDO connection
    $pdo = getDbConnection();
    if ($pdo === null) {
        return ['error' => 'Failed to connect to the database'];
    }

    try {
        $stmt = $pdo->prepare('INSERT INTO pose_sequence (name, duration, position) VALUES (:name, :duration, :position)');

        foreach ($poseSequence as $pose) {
            $stmt->execute([
                'name' => $pose['name'],
                'duration' => $pose['duration'],
                'position' => $pose['position']
            ]);
        }
    } catch (PDOException $e) {
        error_log('PDOException: ' . $e->getMessage());
        return ['error' => 'Failed to save pose sequence to the database'];
    }

    return true;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Use predefined sequence directly
    $poseSequence = definePoseSequence();
    $poseNames = array_column($poseSequence, 'name');
    $poses = fetchPoses($poseNames);

    if (isset($poses['error'])) {
        echo json_encode(['error' => $poses['error']]);
        exit;
    }

    // Save to the database
    $saveResult = savePoseSequenceToDatabase($poseSequence);
    if ($saveResult !== true) {
        echo json_encode(['error' => $saveResult['error']]);
        exit;
    }

    // Create frames based on the fetched poses
    $framePaths = createFrames($poses);
    if (isset($framePaths['error'])) {
        echo json_encode(['error' => $framePaths['error']]);
        exit;
    }

    // Generate video with the created frames
    $videoPath = generateVideo($poseSequence);
    if (isset($videoPath['error'])) {
        echo json_encode(['error' => $videoPath['error']]);
        exit;
    }

    // Return the full URL
    $fullUrl = 'http://localhost:8001/' . $videoPath;
    echo json_encode(['videoPath' => $fullUrl]);

    // Clean up frame files
    foreach ($framePaths as $framePath) {
        unlink($framePath);
    }
}