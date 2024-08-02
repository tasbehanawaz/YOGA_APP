<?php
// this script is an API endpoint that fetches data from another API and returns it as JSON. It's designed to be called with a 'GET' HTTP request.
require 'db.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode(fetchAllYogaPoses());
} else {
    echo json_encode(['error' => 'Invalid request']);
}

function fetchAllYogaPoses()
{
    $apiUrl = "https://yoga-api-nzy4.onrender.com/v1/poses";

    $curl = curl_init();

    curl_setopt_array($curl, [
        CURLOPT_URL => $apiUrl,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
    ]);

    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);

    if ($err) {
        error_log("cURL Error #:" . $err);
        return [];
    } else {
        return json_decode($response, true);
    }
}
