<?php

require_once 'db.php'; // Ensure this is using require_once
require_once 'fetchAllYogaPoses.php'; // Ensure this is using require_once

// Cross-Origin Resource Sharing (CORS) headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

function fetchPoses($poseNames)
{
    $poses = [];
    foreach ($poseNames as $pose) {
        $url = "https://yoga-api-nzy4.onrender.com/v1/poses?name=" . urlencode($pose);
        $response = false;
        $retryCount = 0;
        while ($response === false && $retryCount < 3) {
            $response = fetchUrlWithCurl($url);
            if ($response === false) {
                error_log('Failed to fetch pose: ' . $pose . ' - Retry: ' . ($retryCount + 1));
                $retryCount++;
                sleep(1); // Wait for 1 second before retrying
            }
        }

        if ($response === false) {
            error_log('Failed to fetch pose after retries: ' . $pose);
            return ['error' => 'Failed to fetch pose: ' . $pose];
        }

        $poseData = json_decode($response, true);
        if (json_last_error() === JSON_ERROR_NONE && !empty($poseData)) {
            if (isset($poseData[0])) {
                $poses[] = $poseData[0]; // Adjusting to match the structure of the API response
            } else {
                $poses[] = $poseData; // Handle case where poseData is not wrapped in an array
            }
        } else {
            error_log('Invalid response for pose: ' . $pose . ' - Response: ' . $response);
            return ['error' => 'Invalid response for pose: ' . $pose];
        }
    }
    return $poses;
}

function fetchUrlWithCurl($url)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $response = curl_exec($ch);
    if (curl_errno($ch)) {
        error_log('cURL error: ' . curl_error($ch));
        $response = false;
    }
    curl_close($ch);
    return $response;
}

// Define a sequence of poses, including the time and position for each pose
function definePoseSequence()
{
    return [
        ['name' => 'Boat', 'duration' => 5, 'position' => '1'],
        ['name' => 'Bow', 'duration' => 5, 'position' => '2'],
        ['name' => 'Bridge', 'duration' => 5, 'position' => '3'],
        ['name' => 'Butterfly', 'duration' => 5, 'position' => '4'],
        ['name' => 'Camel', 'duration' => 5, 'position' => '5'],
        ['name' => 'Cat', 'duration' => 5, 'position' => '6'],
        ['name' => 'Chair', 'duration' => 5, 'position' => '7'],
        ['name' => 'Child pose', 'duration' => 5, 'position' => '8'],
        ['name' => 'Corpse', 'duration' => 5, 'position' => '9'],
        ['name' => 'Cow', 'duration' => 5, 'position' => '10'],
        ['name' => 'Crescent Lunge', 'duration' => 5, 'position' => '11'],
        ['name' => 'Crescent Moon', 'duration' => 5, 'position' => '12'],
        ['name' => 'Crow', 'duration' => 5, 'position' => '13'],
        ['name' => 'Dolphin', 'duration' => 5, 'position' => '14'],
        ['name' => 'Downward-Facing Dog', 'duration' => 5, 'position' => '15'],
        ['name' => 'Eagle', 'duration' => 5, 'position' => '15'],
        ['name' => 'Extended Hand to Toe', 'duration' => 5, 'position' => '16'],
        ['name' => 'Extended Side Angle', 'duration' => 5, 'position' => '17'],
        ['name' => 'Forearm Stand', 'duration' => 5, 'position' => '18'],
        ['name' => 'Forward Bend with Shoulder Opener', 'duration' => 5, 'position' => '19'],
        ['name' => 'Garland Pose', 'duration' => 5, 'position' => '20'],
        ['name' => 'Half Boat', 'duration' => 5, 'position' => '21'],
        ['name' => 'Half Lord of the Fishes', 'duration' => 5, 'position' => '22'],
        ['name' => 'Half-Moon', 'duration' => 5, 'position' => '23'],
        ['name' => 'Handstand', 'duration' => 5, 'position' => '24'],
        ['name' => 'King Pigeon', 'duration' => 5, 'position' => '25'],
        ['name' => 'Lotus', 'duration' => 5, 'position' => '26'],
        ['name' => 'Low Lunge', 'duration' => 5, 'position' => '27'],
        ['name' => 'Pigeon', 'duration' => 5, 'position' => '28'],
        ['name' => 'Plank', 'duration' => 5, 'position' => '29'],
        ['name' => 'Plow', 'duration' => 5, 'position' => '30'],
        ['name' => 'Pyramid', 'duration' => 5, 'position' => '31'],
        ['name' => 'Reverse Warrior', 'duration' => 5, 'position' => '32'],
        ['name' => 'Seated Forward Bend', 'duration' => 5, 'position' => '33'],
        ['name' => 'Shoulder Stand', 'duration' => 5, 'position' => '34'],
        ['name' => 'Side Plank', 'duration' => 5, 'position' => '35'],
        ['name' => 'Side Splits', 'duration' => 5, 'position' => '36'],
        ['name' => 'Sphinx', 'duration' => 5, 'position' => '37'],
        ['name' => 'Splits', 'duration' => 5, 'position' => '38'],
        ['name' => 'Standing Forward Bend', 'duration' => 5, 'position' => '39'],
        ['name' => 'Tree', 'duration' => 5, 'position' => '40'],
        ['name' => 'Triangle', 'duration' => 5, 'position' => '41'],
        ['name' => 'Upward-Facing Dog', 'duration' => 5, 'position' => '42'],
        ['name' => 'Warrior One', 'duration' => 5, 'position' => '43'],
        ['name' => 'Warrior Three', 'duration' => 5, 'position' => '44'],
        ['name' => 'Warrior Two', 'duration' => 5, 'position' => '45'],
        ['name' => 'Wheel', 'duration' => 5, 'position' => '46'],
        ['name' => 'Wild Thing', 'duration' => 5, 'position' => '47'],
    ];
}

function shufflePoses($poses)
{
    shuffle($poses);
    foreach ($poses as &$pose) {
        // Shuffle timings for each pose between 5 and 10 seconds
        $pose['duration'] = rand(5, 10);
    }
    return $poses;
}

function createPoseSequences($poses, $numSequences = 15, $sequenceLength = 3)
{
    $sequences = [];
    for ($i = 0; $i < $numSequences; $i++) {
        $shuffled = shufflePoses($poses);
        $sequences[] = array_slice($shuffled, 0, $sequenceLength);
    }
    return $sequences;
}

function savePoseSequencesToDatabase($sequences)
{
    $pdo = getDbConnection();
    if ($pdo === null) {
        return ['error' => 'Failed to connect to the database'];
    }

    try {
        $stmt = $pdo->prepare('INSERT INTO pose_sequences (sequence_name, pose_data) VALUES (:sequence_name, :pose_data)');
        foreach ($sequences as $index => $sequence) {
            $sequenceName = "Sequence " . ($index + 1);
            $poseData = json_encode($sequence);
            $stmt->execute([
                'sequence_name' => $sequenceName,
                'pose_data' => $poseData
            ]);
        }
    } catch (PDOException $e) {
        error_log('PDOException: ' . $e->getMessage());
        return ['error' => 'Failed to save pose sequences to the database'];
    }

    return true;
}

function getPoseSequencesFromDatabase()
{
    $pdo = getDbConnection();
    if ($pdo === null) {
        return ['error' => 'Failed to connect to the database'];
    }

    try {
        $stmt = $pdo->query('SELECT sequence_name, pose_data FROM pose_sequences');
        $sequences = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Decode JSON data
        foreach ($sequences as &$sequence) {
            $sequence['pose_data'] = json_decode($sequence['pose_data'], true);
        }

        return $sequences;
    } catch (PDOException $e) {
        error_log('PDOException: ' . $e->getMessage());
        return ['error' => 'Failed to retrieve pose sequences from the database'];
    }
}

function getOrCreateSequence($selectedPoses)
{
    $pdo = getDbConnection();
    $sequenceName = implode("-", array_column($selectedPoses, 'name')); // Create a unique name based on pose names

    try {
        $stmt = $pdo->prepare("SELECT * FROM pose_sequences WHERE sequence_name = ?");
        $stmt->execute([$sequenceName]);
        $sequence = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($sequence) {
            return json_decode($sequence['pose_data'], true); // Return existing sequence
        } else {
            // If sequence does not exist, create it
            $newSequence = createPoseSequences([$selectedPoses], 1, count($selectedPoses))[0];
            savePoseSequencesToDatabase([$newSequence]);
            return $newSequence;
        }
    } catch (PDOException $e) {
        error_log('PDOException: ' . $e->getMessage());
        return ['error' => 'Database operation failed'];
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputData = json_decode(file_get_contents('php://input'), true);
    $selectedPoses = $inputData['selectedPoses'] ?? [];

    // Check if there are specific poses selected, otherwise use the default sequence
    if (empty($selectedPoses)) {
        $poseSequence = definePoseSequence(); // Your predefined sequence
    } else {
        $poseSequence = getOrCreateSequence($selectedPoses); // Dynamic creation or fetching
    }

    if (isset($poseSequence['error'])) {
        echo json_encode(['error' => $poseSequence['error']]);
        exit;
    }

    // Create multiple sequences with shuffling if the sequence is predefined
    if (!empty($selectedPoses)) {
        $sequences = createPoseSequences([$poseSequence]);
    } else {
        $sequences = createPoseSequences($poseSequence);
    }

    // Save sequences to the database
    $saveResult = savePoseSequencesToDatabase($sequences);
    if ($saveResult !== true) {
        echo json_encode(['error' => $saveResult['error']]);
        exit;
    }

    // Optionally, retrieve and display saved sequences
    $retrievedSequences = getPoseSequencesFromDatabase();
    if (isset($retrievedSequences['error'])) {
        echo json_encode(['error' => $retrievedSequences['error']]);
        exit;
    }

    echo json_encode(['success' => true, 'saved_sequences' => $retrievedSequences]);
}
