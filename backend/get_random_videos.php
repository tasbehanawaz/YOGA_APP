<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $randomVideos = fetchRandomVideos();
        echo json_encode(['status' => 'success', 'data' => $randomVideos]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
    }
} catch (Exception $e) {
    error_log("Error fetching random videos: " . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'An error occurred: ' . $e->getMessage()]);
}

function fetchRandomVideos() {
    // Example static list of videos
    $videos = [
        ['videoPath' => 'https://example.com/videos/video1.mp4'],
        ['videoPath' => 'https://example.com/videos/video2.mp4'],
        ['videoPath' => 'https://example.com/videos/video3.mp4'],
        ['videoPath' => 'https://example.com/videos/video4.mp4'],
        ['videoPath' => 'https://example.com/videos/video5.mp4']
    ];

    // Shuffle the array to randomize
    shuffle($videos);

    // Return a subset of videos (e.g., 3 random videos)
    return array_slice($videos, 0, 3);
}




?>
