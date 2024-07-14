<?php
require 'vendor/autoload.php';

use GuzzleHttp\Client;

function generateOpenAIAudio($description, $filePath) {
    $OPENAI_API_KEY = getenv('YOGA_APP_OPENAI_API_KEY');
    // $userId = getenv('YOGA_APP_PLAYHT_USER_ID');
    
    if (!$OPENAI_API_KEY) {
        error_log('API key is not set.');
        return false;
    }

    $client = new Client();
    $url = 'https://api.openai.com/v1/audio/speech';

    try {
        $response = $client->post($url, [
            'headers' => [
                'Authorization' => 'Bearer ' . $OPENAI_API_KEY,
                // 'accept' => 'audio/mpeg',
                'content-type' => 'application/json'
            ],
            'json' => [
                'input' => $description,
                'model' => "tts-1",
                'voice' => 'nova',
                'speed' => 1,
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
