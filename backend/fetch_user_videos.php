<?php
// fetch_user_videos.php

header('Content-Type: application/json');

require 'database_connection.php'; // Replace with your actual database connection script

$user_id = $_GET['user_id'];

if (!$user_id) {
    echo json_encode(['error' => 'User ID is required']);
    exit();
}

$query = $pdo->prepare("SELECT videoPath FROM user_videos WHERE user_id = :user_id ORDER BY created_at DESC LIMIT 5");
$query->execute(['user_id' => $user_id]);
$videos = $query->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($videos);
