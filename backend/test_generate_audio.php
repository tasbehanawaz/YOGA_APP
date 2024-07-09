<?php
require 'vendor/autoload.php';

use GuzzleHttp\Client;

function generatePlayHTAudio($description, $filePath) {
    // Directly set the environment variables for testing
    $apiKey = getenv('YOGA_APP_PLAYHT_API_KEY');
    $userId = getenv('YOGA_APP_PLAYHT_USER_ID');

    if (!$apiKey || !$userId) {
        error_log('API key or User ID is not set.');
        return false;
    }

    $client = new Client();
    $url = 'https://api.play.ht/api/v2/tts/stream';

    try {
        $response = $client->post($url, [
            'headers' => [
                'Authorization' => $apiKey,
                'X-User-ID' => $userId,
                'accept' => 'audio/mpeg',
                'content-type' => 'application/json'
            ],
            'json' => [
                'text' => $description,
                'voice' => 's3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json', // Replace with desired voice ID
                'output_format' => 'mp3',
                'speed' => 1,
                'sample_rate' => 44100,
                'voice_engine' => 'PlayHT2.0-turbo'
            ],
        ]);

        $audioContent = $response->getBody()->getContents();
        file_put_contents($filePath, $audioContent);
        return true;
    } catch (Exception $e) {
        error_log('Error generating audio: ' . $e->getMessage());
        return false;
    }
}

// Test the function
$description = "Hello, this is a test message for generating audio using Play.ht.";
$filePath = 'test_audio.mp3';

$success = generatePlayHTAudio($description, $filePath);

if ($success) {
    echo "Audio generation successful! Check the file: $filePath\n";
} else {
    echo "Audio generation failed.\n";
}
?>
