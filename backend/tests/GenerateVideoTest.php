<?php
use PHPUnit\Framework\TestCase;

require_once 'generate_video.php';

class GenerateVideoTest extends TestCase
{
    protected function setUp(): void
    {
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_SERVER['HTTP_HOST'] = 'localhost:8001';
    }

    public function testFetchUrlWithCurl()
    {
        $url = 'https://yoga-api-nzy4.onrender.com/v1/poses?name=Mountain%20Pose';
        $response = fetchUrlWithCurl($url);
        $this->assertNotFalse($response);
        $this->assertJson($response);
    }

    public function testCreateFrames()
    {
        $poses = [
            [
                'name' => 'Mountain Pose',
                'url_png' => 'https://via.placeholder.com/640x360.png'
            ],
            [
                'name' => 'Warrior Pose',
                'url_png' => 'https://via.placeholder.com/640x360.png'
            ]
        ];

        $framePaths = createFrames($poses);
        $this->assertIsArray($framePaths);
        $this->assertCount(2, $framePaths);

        foreach ($framePaths as $framePath) {
            if (file_exists($framePath)) {
                unlink($framePath);
            }
        }
    }

    public function testGetAudioDuration()
    {
        $filePath = 'audio/sample.mp3';

        if (file_exists($filePath)) {
            $duration = getAudioDuration($filePath);
            $this->assertIsFloat($duration);
            $this->assertGreaterThan(0, $duration);
        } else {
            $this->markTestSkipped("Audio file $filePath does not exist, skipping test.");
        }
    }

    public function testCalculateTotalAudioDuration()
    {
        $audioFilePaths = ['audio/sample1.mp3', 'audio/sample2.mp3'];

        $allFilesExist = array_reduce($audioFilePaths, function ($carry, $filePath) {
            return $carry && file_exists($filePath);
        }, true);

        if ($allFilesExist) {
            $totalDuration = calculateTotalAudioDuration($audioFilePaths);
            $this->assertIsFloat($totalDuration);
            $this->assertGreaterThan(0, $totalDuration);
        } else {
            $this->markTestSkipped("One or more audio files do not exist, skipping test.");
        }
    }

    public function testGenerateVideoWithValidInput()
    {
        $inputData = json_encode([
            'poses' => ['Mountain Pose', 'Warrior Pose'],
            'filters' => [
                'difficulty_level' => 'Intermediate'
            ]
        ]);

        // Use a method to simulate input data without redefining global functions
        $this->simulateInput($inputData);

        ob_start();
        include 'generate_video.php';
        $output = ob_get_clean();

        $response = json_decode($output, true);

        $this->assertArrayHasKey('videoPath', $response);
    }

    protected function simulateInput($data)
    {
        // Simulate input by setting php://input context
        file_put_contents('php://memory', $data);
        stream_filter_append(fopen('php://input', 'rb'), 'string.toupper');
    }
}
