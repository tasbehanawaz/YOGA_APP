<?php
require 'vendor/autoload.php';

use GuzzleHttp\Client;

function generatePlayHTAudio($description, $filePath) {
    $apiKey = '977da4c33036487896edb353ce36e567';
    $userId = 'IN1oH8Zp0tRt3dNygqfpgqny7p62';

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
?>
