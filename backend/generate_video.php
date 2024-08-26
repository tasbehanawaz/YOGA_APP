<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: video/mp4");
header("Connection: keep-alive");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $input = json_decode(file_get_contents('php://input'), true);
        if (!isset($input['poses']) || !is_array($input['poses'])) {
            echo json_encode(['error' => 'Invalid input']);
            exit;
        }

        $poseNames = $input['poses'];
        $inputtedDuration = $input['duration'] * 60; //convert to seconds
        $filters = isset($input['filters']) ? $input['filters'] : [];

        $poses = fetchPoses($poseNames, $filters);
        if (isset($poses['error'])) {
            echo json_encode(['error' => $poses['error']]);
            exit;
        }

        $framePaths = createFrames($poses);
        if (isset($framePaths['error'])) {
            echo json_encode(['error' => $framePaths['error']]);
            exit;
        }

        $videoPath = generateVideo($framePaths, $poseNames, $inputtedDuration);
        if (isset($videoPath['error'])) {
            echo json_encode(['error' => $videoPath['error']]);
            exit;
        }

        // Clean up resources
        foreach ($framePaths as $framePath) {
            if (file_exists($framePath)) {
                unlink($framePath);
            }
        }

        $fullUrl = 'http://localhost:8001/' . $videoPath;
        echo json_encode(['videoPath' => $fullUrl]);
    } catch (Exception $e) {
        error_log($e->getMessage());
        echo json_encode(['error' => 'An unexpected error occurred.']);
        exit;
    }
}

function fetchPoses($poseNames, $filters)
{
    $poses = [];
    foreach ($poseNames as $pose) {
        // Construct URL with filters if available
        $url = "https://yoga-api-nzy4.onrender.com/v1/poses?name=" . urlencode($pose);
        foreach ($filters as $key => $value) {
            if (!empty($value)) {
                $url .= "&" . urlencode($key) . "=" . urlencode($value);
            }
        }

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
                $poses[] = $poseData[0];
            } else {
                $poses[] = $poseData;
            }
        } else {
            error_log('Invalid response for pose: ' . $pose . ' - Response: ' . $response);
            return ['error' => 'Invalid response for pose: ' . $pose];
        }
    }
    return $poses;
}

function getAudioDuration($filePath)
{
    $command = "ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 " . escapeshellarg($filePath);
    $output = shell_exec($command);
    if ($output === null) {
        return 0.0;
    }
    return floatval($output);
}

function calculateTotalAudioDuration($audioFilePaths)
{
    $totalDuration = 0.0;
    foreach ($audioFilePaths as $filePath) {
        $duration = getAudioDuration($filePath);
        $totalDuration += $duration;
    }
    return $totalDuration;
}

function fetchUrlWithCurl($url)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $response = curl_exec($ch);
    if (curl_errno($ch)) {
        $response = false;
    }
    curl_close($ch);
    return $response;
}

function createFrames($poses)
{
    $framePaths = [];
    if (!is_dir('frames')) {
        mkdir('frames', 0777, true);
    }
    foreach ($poses as $index => $pose) {
        $imagePath = sprintf('frames/pose%03d.png', $index);
        $imageContent = file_get_contents($pose['url_png']);
        if ($imageContent === FALSE) {
            return ['error' => 'Failed to fetch image for pose: ' . $pose['name']];
        }
        file_put_contents($imagePath, $imageContent);
        if (!file_exists($imagePath)) {
            return ['error' => 'Failed to save pose image'];
        }
        $framePaths[] = $imagePath;
    }
    return $framePaths;
}

function createSrtFile($poseName, $floatDuration)
{
    $duration = (int)round($floatDuration);
    $durationFormatted = gmdate("H:i:s", $duration);
    $srtContent = "1\n00:00:00,000 --> {$durationFormatted},000\n$poseName\n";
    $srtPath = "subtitles/{$poseName}.srt";
    file_put_contents($srtPath, $srtContent);
    return $srtPath;
}

function generateVideo($framePaths, $poseNames, $inputtedDuration)
{
    if (!is_dir('output')) {
        mkdir('output', 0777, true);
    }
    if (!is_dir('subtitles')) {
        mkdir('subtitles', 0777, true);
    }

    $uniqueId = uniqid();
    $videoPath = 'output/yoga_sequence_' . $uniqueId . '.mp4';

    $inputs = [];
    $audioInputs = [];
    $audioFilePaths = [];
    $filterComplexParts = [];
    $subtitleInputs = [];

    foreach ($framePaths as $index => $framePath) {
        if (!file_exists($framePath)) {
            return ['error' => 'Frame file not found: ' . $framePath];
        }

        $audioFilePath = 'audio/' . $poseNames[$index] . '.mp3';
        if (file_exists($audioFilePath)) {
            $duration = getAudioDuration($audioFilePath);
            $inputs[] = "-loop 1 -t $duration -i " . escapeshellarg($framePath);
            $audioInputs[] = "-i " . escapeshellarg($audioFilePath);
            $audioFilePaths[] = $audioFilePath;

            $floatDuration = floatval($duration);
            $srtPath = createSrtFile($poseNames[$index], $floatDuration);
            $subtitleInputs[] = "-i " . escapeshellarg($srtPath);

            $filterComplexParts[] = "[$index:v]scale=640:360:force_original_aspect_ratio=decrease,pad=640:360:(ow-iw)/2:(oh-ih)/2,setsar=1,subtitles=" . escapeshellarg($srtPath) . ":force_style='FontName=Arial,FontSize=24'[v$index]";
        } else {
            return ['error' => 'Audio file not found for pose: ' . $poseNames[$index]];
        }
    }

    $inputString = implode(' ', $inputs) . ' ' . implode(' ', $audioInputs) . ' ' . implode(' ', $subtitleInputs);
    if (isset($inputtedDuration) &&   $inputtedDuration > calculateTotalAudioDuration($audioFilePaths)) {
        $totalAudioDuration = $inputtedDuration;
    } else {
        $totalAudioDuration = calculateTotalAudioDuration($audioFilePaths);
    } // here

    $filterComplexString = implode(";", $filterComplexParts) . ";";
    $audioFilterComplexString = "";
    for ($i = 0; $i < count($framePaths); $i++) {
        $audioFilterComplexString .= "[" . ($i + count($framePaths)) . ":a]";
    }
    $audioFilterComplexString .= "concat=n=" . count($framePaths) . ":v=0:a=1[aout]";

    $concatInputs = implode("", array_map(function ($index) {
        return "[v$index]";
    }, array_keys($framePaths)));
    $filterComplexString .= "$concatInputs concat=n=" . count($framePaths) . ":v=1:a=0[vout]; $audioFilterComplexString";

    $command = "ffmpeg -y $inputString -filter_complex \"$filterComplexString\" " .
        "-map \"[vout]\" -map \"[aout]\" " .
        "-c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k " .
        "-pix_fmt yuv420p -movflags +faststart -t $totalAudioDuration $videoPath 2>&1";

    $output = shell_exec($command);
    if (!file_exists($videoPath)) {
        return ['error' => 'Failed to generate video'];
    }
    return $videoPath;
}
