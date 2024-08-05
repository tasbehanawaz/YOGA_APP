<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require 'db.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $poses = fetchAndClassifyAllYogaPoses();
        echo json_encode(['status' => 'success', 'data' => $poses]);
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        $filterOptions = isset($data) ? $data : [];

        $poses = fetchAndClassifyAllYogaPoses($filterOptions);
        echo json_encode(['status' => 'success', 'data' => $poses]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
    }
} catch (Exception $e) {
    error_log("Error in yoga poses API: " . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'An error occurred: ' . $e->getMessage()]);
}

function fetchAndClassifyAllYogaPoses($filterOptions = []) {
    $poses = fetchAllYogaPoses();
    $classifiedPoses = classifyPoses($poses);
    if (!empty($filterOptions)) {
        $classifiedPoses = applyFilters($classifiedPoses, $filterOptions);
    }
    printDifficultyDistribution($classifiedPoses);
    return $classifiedPoses;
}

function applyFilters($poses, $filters) {
    $filteredPoses = $poses;

    // Apply difficulty level filter only if not 'mixed'
    if (isset($filters['difficulty_level']) && $filters['difficulty_level'] !== 'mixed') {
        $filteredPoses = array_filter($filteredPoses, function($pose) use ($filters) {
            return strtolower($pose['difficulty_level']) === strtolower($filters['difficulty_level']);
        });
    }

    // If difficulty level is 'mixed', apply no filters and return all poses
    // This section is handled implicitly as we do nothing when difficulty level is 'mixed'

    return array_values($filteredPoses);
}

function classifyPoses($poses) {
    $advancedCriteria = ['balance', 'strength', 'flexibility', 'advanced', 'challenging', 'complex', 'inversion', 'headstand', 'handstand', 'arm balance', 'backbend'];
    $intermediateCriteria = ['moderate', 'intermediate', 'flowing', 'dynamic', 'twist', 'lunge', 'core strength'];
    $beginnerCriteria = ['beginner', 'easy', 'gentle', 'relaxing', 'basic'];

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

        if (str_contains($description, 'beginner')) $points -= 2;
        if (str_contains($description, 'intermediate')) $points += 1;
        if (str_contains($description, 'advanced')) $points += 2;

        foreach ($advancedCriteria as $criterion) {
            if (str_contains($description, $criterion)) $points += 1.5;
        }
        foreach ($intermediateCriteria as $criterion) {
            if (str_contains($description, $criterion)) $points += 1;
        }
        foreach ($beginnerCriteria as $criterion) {
            if (str_contains($description, $criterion)) $points -= 1;
        }

        if (str_contains($description, 'arm balance') || str_contains($description, 'inversion')) $points += 2;
        if (str_contains($description, 'core strength')) $points += 1;
        if (str_contains($description, 'relaxation')) $points -= 1;

        foreach ($specificPoseAdjustments as $poseName => $adjustment) {
            if (stripos($pose['english_name'], $poseName) !== false) {
                $points += $adjustment;
                break;
            }
        }

        if ($points >= 2.5) {
            $pose['difficulty_level'] = 'Advanced';
        } elseif ($points >= 0.5) {
            $pose['difficulty_level'] = 'Intermediate';
        } else {
            $pose['difficulty_level'] = 'Beginner';
        }

        $pose['difficulty_points'] = $points;
    }
    return $poses;
}

function printDifficultyDistribution($poses) {
    $distribution = array_count_values(array_column($poses, 'difficulty_level'));
    error_log("Difficulty Distribution: " . json_encode($distribution));
    foreach ($poses as $pose) {
        error_log("{$pose['english_name']}: Level: {$pose['difficulty_level']}, Points: {$pose['difficulty_points']}");
    }
}

function fetchAllYogaPoses() {
    $apiUrl = "https://yoga-api-nzy4.onrender.com/v1/poses";
    return makeApiRequest($apiUrl);
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
