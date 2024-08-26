<?php
// Set headers to allow cross-origin requests and specify the content type
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: video/mp4");
header("Connection: keep-alive");

// Get the video file path from the query parameter
$videoPath = isset($_GET['path']) ? $_GET['path'] : '';

if (file_exists($videoPath)) {
    $videoSize = filesize($videoPath);

    // Set the content length header
    header("Content-Length: $videoSize");

    // Read and output the video file
    readfile($videoPath);
} else {
    // If the file does not exist, return a 404 response
    http_response_code(404);
    echo json_encode(['error' => 'Video not found']);
}
exit;
