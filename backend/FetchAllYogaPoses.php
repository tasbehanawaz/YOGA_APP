<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


require 'cors.php';
require 'db.php';


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

    // Adjust difficulty level based on age if provided and no specific difficulty is selected
    if (isset($filters['age'])) {
        switch ($filters['age']) {
            case '18-25':
                $filters['difficulty_level'] = 'Advanced'; // Younger users can handle advanced poses
                break;
            case '26-30':
                $filters['difficulty_level'] = 'Intermediate'; // Mid-range users might prefer intermediate poses
                break;
            case '31-50':
            case '50+':
                $filters['difficulty_level'] = 'Beginner'; // Older users tend to prefer beginner-level poses
                break;
            default:
                break;
        }
    }

    // Filter by difficulty level
    if (isset($filters['difficulty_level']) && $filters['difficulty_level'] !== 'all') {
        $filteredPoses = array_filter($filteredPoses, function ($pose) use ($filters) {
            return strtolower($pose['difficulty_level']) === strtolower($filters['difficulty_level']);
        });
    }

    // Filter by focus area if applicable
    if (isset($filters['focus_area']) && $filters['focus_area'] !== '') {
        $filteredPoses = array_filter($filteredPoses, function ($pose) use ($filters) {
            return strtolower($pose['focus_area']) === strtolower($filters['focus_area']);
        });
    }

    return array_values($filteredPoses);
}

function classifyPoses($poses)
{
    // Classification logic for difficulty level (already present)
    $advancedCriteria = ['balance', 'strength', 'flexibility', 'advanced', 'challenging', 'complex', 'inversion', 'headstand', 'handstand', 'arm balance', 'backbend'];
    $intermediateCriteria = ['moderate', 'intermediate', 'flowing', 'dynamic', 'twist', 'lunge', 'core strength'];
    $beginnerCriteria = ['beginner', 'easy', 'gentle', 'relaxing', 'basic'];

    // Focus Area Keywords
    $balanceKeywords = ["stability", "focus", "equilibrium", "alignment", "movement", "center", "concentration", "coordination"];
    $flexibilityKeywords = ["stretch", "elevate", "lengthen", "loosen", "extend", "open", "elasticity", "mobility", "spread"];
    $coreKeywords = ["abdominal", "core", "engagement", "bandhas", "support", "spine", "strengthens", "stabilize"];

    foreach ($poses as &$pose) {
        $description = strtolower($pose['pose_benefits'] . ' ' . ($pose['pose_description'] ?? '') . ' ' . $pose['english_name']);
        $points = 0;

        // Classify based on advanced, intermediate, or beginner criteria
        foreach ($advancedCriteria as $criterion) {
            if (str_contains($description, $criterion)) {
                $points += 1.5;
            }
        }
        foreach ($intermediateCriteria as $criterion) {
            if (str_contains($description, $criterion)) {
                $points += 1;
            }
        }
        foreach ($beginnerCriteria as $criterion) {
            if (str_contains($description, $criterion)) {
                $points -= 1;
            }
        }

        // Set difficulty level
        if ($points >= 2.5) {
            $pose['difficulty_level'] = 'Advanced';
        } elseif ($points >= 0.5) {
            $pose['difficulty_level'] = 'Intermediate';
        } else {
            $pose['difficulty_level'] = 'Beginner';
        }

        // Classify based on focus area
        if (str_contains_any($description, $balanceKeywords)) {
            $pose['focus_area'] = 'Balance';
        } elseif (str_contains_any($description, $flexibilityKeywords)) {
            $pose['focus_area'] = 'Flexibility';
        } elseif (str_contains_any($description, $coreKeywords)) {
            $pose['focus_area'] = 'Core';
        } else {
            $pose['focus_area'] = 'General'; // Default if no match
        }
    }
    return $poses;
}

// Helper function to check if a description contains any keyword
function str_contains_any($text, $keywords)
{
    foreach ($keywords as $keyword) {
        if (str_contains($text, strtolower($keyword))) {
            return true;
        }
    }
    return false;
}

function fetchAllYogaPoses()
{
    // Fetch poses from the external API
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
