<?php
// This script is an API endpoint that fetches data from another API and returns it as JSON. It's designed to be called with a 'GET' HTTP request.
require 'db.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if (isset($_GET['level']) && $_GET['level'] !== 'all') {
            $level = $_GET['level'];
            $poses = fetchYogaPosesByLevel($level);
            echo json_encode(['status' => 'success', 'data' => $poses]);
        } else {
            $poses = fetchAndClassifyAllYogaPoses();
            echo json_encode(['status' => 'success', 'data' => $poses]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
    }
} catch (Exception $e) {
    error_log("Error in yoga poses API: " . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'An error occurred: ' . $e->getMessage()]);
}

function classifyPoses($poses) {
    $advancedCriteria = ['balance', 'strength', 'flexibility', 'advanced', 'challenging', 'complex', 'inversion', 'headstand', 'handstand', 'arm balance', 'backbend'];
    $intermediateCriteria = ['moderate', 'intermediate', 'flowing', 'dynamic', 'twist', 'lunge', 'core strength'];
    $beginnerCriteria = ['beginner', 'easy', 'gentle', 'relaxing', 'basic'];

    // Specific pose adjustments
    $specificPoseAdjustments = [
        'Shoulder Stand' => 3,
        'Splits' => 3,
        'Pigeon' => 1.5,
        'Bridge' => 1,
        'Plow' => 2.5,
        'Bow' => 2,
        'Wheel' => 2.5,
        'Crow' => 2.5,
        

    ];

    foreach ($poses as &$pose) {
        $description = strtolower($pose['pose_benefits'] . ' ' . ($pose['pose_description'] ?? '') . ' ' . $pose['english_name']);
        $words = explode(' ', $description);
        
        $points = 0;
        
        // Check for exact matches
        if (str_contains($description, 'beginner')) $points -= 2;
        if (str_contains($description, 'intermediate')) $points += 1;
        if (str_contains($description, 'advanced')) $points += 2;
        
        // Check for criteria matches
        foreach ($advancedCriteria as $criterion) {
            if (str_contains($description, $criterion)) $points += 1.5;
        }
        foreach ($intermediateCriteria as $criterion) {
            if (str_contains($description, $criterion)) $points += 1;
        }
        foreach ($beginnerCriteria as $criterion) {
            if (str_contains($description, $criterion)) $points -= 1;
        }
        
        // Additional checks
        if (str_contains($description, 'arm balance') || str_contains($description, 'inversion')) $points += 2;
        if (str_contains($description, 'core strength')) $points += 1;
        if (str_contains($description, 'relaxation')) $points -= 1;
        
        // Apply specific pose adjustments
        foreach ($specificPoseAdjustments as $poseName => $adjustment) {
            if (stripos($pose['english_name'], $poseName) !== false) {
                $points += $adjustment;
                break;
            }
        }
        
        // Classify based on points
        if ($points >= 2.5) {
            $pose['difficulty_level'] = 'Advanced';
        } elseif ($points >= 0.5) {
            $pose['difficulty_level'] = 'Intermediate';
        } else {
            $pose['difficulty_level'] = 'Beginner';
        }
        
        // Add the points to the pose data for debugging
        $pose['difficulty_points'] = $points;
    }
    return $poses;
}

// Helper functions
function printDifficultyDistribution($poses) {
    $distribution = array_count_values(array_column($poses, 'difficulty_level'));
    error_log("Difficulty Distribution: " . json_encode($distribution));
    
    // Print out poses with their difficulty levels and points
    foreach ($poses as $pose) {
        error_log("{$pose['english_name']}: Level: {$pose['difficulty_level']}, Points: {$pose['difficulty_points']}");
    }
}

function fetchAndClassifyAllYogaPoses() {
    $poses = fetchAllYogaPoses();
    $classifiedPoses = classifyPoses($poses);
    printDifficultyDistribution($classifiedPoses);
    return $classifiedPoses;
}

function fetchAllYogaPoses() {
    $apiUrl = "https://yoga-api-nzy4.onrender.com/v1/poses";
    return makeApiRequest($apiUrl);
}

function fetchYogaPosesByLevel($level) {
    $allPoses = fetchAndClassifyAllYogaPoses();
    return array_values(array_filter($allPoses, function($pose) use ($level) {
        return strtolower($pose['difficulty_level']) === strtolower($level);
    }));
}

function makeApiRequest($apiUrl) {
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
        throw new Exception("cURL Error #:" . $err);
    }

    $data = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("JSON decoding error: " . json_last_error_msg());
    }

    return $data ?? [];
}
?>