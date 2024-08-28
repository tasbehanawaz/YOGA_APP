<?php
/*get_saved_videos.php
header('Content-Type: application/json');
include 'database.php';

$user_id = $_GET['user_id'];

$query = $pdo->prepare('SELECT video_path FROM videos WHERE user_id = ?');
$query->execute([$user_id]);
$videos = $query->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($videos);
?>
