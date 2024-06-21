<?php
require 'db.php'; // Ensure this includes the function getDbConnection()

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

$db = getDbConnection(); // This line is crucial, it initializes your $db variable

$stmt = $db->prepare("SELECT * FROM yoga_poses");
$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($results);
?>
