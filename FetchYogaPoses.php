<?php

/**
 * Fetches a yoga pose by name.
 * 
 * @param string $poseName The name of the yoga pose to fetch.
 * @return array An associative array representing the yoga pose, or an empty array on failure.
 */
function fetchYogaPoseByName($poseName) {
    $apiUrl = "https://yoga-api-nzy4.onrender.com/v1/poses?name=" . urlencode($poseName); // Use variable poseName

    // Initialize cURL session
    $curl = curl_init();

    // Set cURL options
    curl_setopt_array($curl, [
        CURLOPT_URL => $apiUrl,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
    ]);

    // Execute cURL session and capture response
    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);

    if ($err) {
        error_log("cURL Error #:" . $err);
        return [];
    } else {
        // Decode and return the data array
        $data = json_decode($response, true);
        // Return only the first pose if multiple are returned or the pose directly if only one is returned
        return $data[0] ?? $data;
    }
}
