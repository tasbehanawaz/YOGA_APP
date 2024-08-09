<?php
header("Content-Type: application/json");
$input = json_decode(file_get_contents('php://input'), true);
$user_id = $input['user_id'];

// Replace with your database connection and query logic
$previousVideos = []; // Fetch previous videos from database for the user

echo json_encode($previousVideos);
?>
