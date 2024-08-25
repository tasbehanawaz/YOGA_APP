<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'db.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if (!isset($_SERVER['REQUEST_METHOD'])) {
    $_SERVER['REQUEST_METHOD'] = 'CLI'; // Set default for testing environment
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $level = isset($_GET['level']) ? $_GET['level'] : 'all';
        $poses = fetchAndClassifyAllYogaPoses(['difficulty_level' => $level]);
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


function fetchAndClassifyAllYogaPoses($filterOptions = [])
{
    $poses = fetchAllYogaPoses();
    $classifiedPoses = classifyPoses($poses);
    if (!empty($filterOptions)) {
        $classifiedPoses = applyFilters($classifiedPoses, $filterOptions);
    }
    return $classifiedPoses;
}

function applyFilters($poses, $filters)
{

    $filteredPoses = $poses;

    if (isset($filters['difficulty_level']) && $filters['difficulty_level'] !== 'all') {
        if (is_array($filters['difficulty_level'])) {
            $difficultyLevels = array_map('strtolower', $filters['difficulty_level']);
            // If the array is not empty then filter
            if (!empty($difficultyLevels)) {
                $filteredPoses = array_filter($filteredPoses, function ($pose) use ($difficultyLevels) {
                    return in_array(strtolower($pose['difficulty_level']), $difficultyLevels);
                });
            }
        } else {
            $filteredPoses = array_filter($filteredPoses, function ($pose) use ($filters) {
                return strtolower($pose['difficulty_level']) === strtolower($filters['difficulty_level']);
            });
        }
    }
    // Filter by focus area
    if (isset($filters['focus_area']) && ($filters['focus_area'] !== 'all')) {
        if (is_array($filters['focus_area'])) {
            $focusAreas = array_map('strtolower', $filters['focus_area']);
            // If the array is not empty then filter
            if (!empty($focusAreas)) {
                $filteredPoses = array_filter($filteredPoses, function ($pose) use ($focusAreas) {
                    return in_array(strtolower($pose['focus_area']), $focusAreas);
                });
            }
        } else {
            $filteredPoses = array_filter($filteredPoses, function ($pose) use ($filters) {
                return strtolower($pose['focus_area']) === strtolower($filters['focus_area']);
            });
        }
    }

    return array_values($filteredPoses);
}

function classifyPoses($poses)
{
    $advancedCriteria = ['balance', 'strength', 'flexibility', 'advanced', 'challenging', 'complex', 'inversion', 'headstand', 'handstand', 'arm balance', 'backbend'];
    $intermediateCriteria = ['moderate', 'intermediate', 'flowing', 'dynamic', 'twist', 'lunge', 'core strength'];
    $beginnerCriteria = ['beginner', 'easy', 'gentle', 'relaxing', 'basic'];

    // Focus Area
    $balance = ["stability", "focus", "equilibrium", "alignment", "movement", "center", "concentration", "coordination"];
    $flexibility = ["stretch", "elevate", "lengthen", "loosen", "extend", "open", "elasticity", "mobility", "spread"];
    $core = ["abdominal", "core", "engagement", "bandhas", "support", "spine", "strengthens", "stabilize"];

    $balance_score = 0;
    $flexibility_score = 0;
    $core_score = 0;


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
        $points = 0;

        // Calculating scores for Focus Areas
        calculate_score($description, $balance, $balance_score);
        calculate_score($description, $flexibility, $flexibility_score);
        calculate_score($description, $core, $core_score);

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
        if (str_contains($description, 'core')) $points += 1;
        if (str_contains($description, 'relaxation')) $points -= 1;

        foreach ($specificPoseAdjustments as $poseName => $adjustment) {
            if (stripos($pose['english_name'], $poseName) !== false) {
                $points += $adjustment;
                break;
            }
        }

        $highest_score = max($balance_score, $flexibility_score, $core_score);


        if ($highest_score == $balance_score) {
            $pose['focus_area']  = 'balance';
        } elseif ($highest_score == $flexibility_score) {
            $pose['focus_area']  = 'flexibility';
        } else {
            $pose['focus_area']  = 'core';
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

function calculate_score($description, $focus_area, &$focus_area_score)
{
    $focus_area_score = 0;

    foreach ($focus_area as $keyword) {
        if (str_contains($description, $keyword)) {
            $focus_area_score++;
        }
    }

    return $focus_area_score;
}

function printDifficultyDistribution($poses)
{
    $distribution = array_count_values(array_column($poses, 'difficulty_level'));
    error_log("Difficulty Distribution: " . json_encode($distribution));
    foreach ($poses as $pose) {
        error_log("{$pose['english_name']}: Level: {$pose['difficulty_level']}, Points: {$pose['difficulty_points']}");
    }
}

function fetchAllYogaPoses()
{
    $apiUrl = "https://yoga-api-nzy4.onrender.com/v1/poses";
    return makeApiRequest($apiUrl);
}

function makeApiRequest($apiUrl)
{
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
