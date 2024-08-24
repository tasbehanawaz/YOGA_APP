<?php
/*
ob_start(); // Start output buffering

require_once 'db.php';
require_once 'test_generate_video.php';
require_once 'fetchAllYogaPoses.php'; // Ensure this file includes the functions to fetch poses

// Cross-Origin Resource Sharing (CORS) headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Retrieve sequences from the database
$sequences = getPoseSequencesFromDatabase();
if (isset($sequences['error'])) {
    die("Error retrieving sequences: " . $sequences['error']);
}

// Retrieve all poses
$allPoses = fetchAllYogaPoses();
if (empty($allPoses)) {
    die("Error fetching yoga poses.");
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="test_sequences.css">
    <title>Yoga Pose Sequences</title>
</head>

<body>
    <header>
        <h1>Yoga Pose Sequences</h1>
    </header>
    <main class="poses">
        <section class="all-poses">
            <h2>All Yoga Poses</h2>
            <form id="pose-selection-form" method="POST" action="">
                <ul class="pose-list">
                    <?php foreach ($allPoses as $pose): ?>
                        <li class="pose-item">
                            <label>
                                <!-- Check if the key exists and is not null before using it -->
                                <input type="checkbox" name="selected_poses[]"
                                    value="<?php echo isset($pose['name']) ? htmlspecialchars($pose['name']) : ''; ?>">
                                <div class="container">
                                    <?php
                                    $poseName = isset($pose['name']) ? urlencode($pose['name']) : '';
                                    $poseNameHtml = isset($pose['name']) ? htmlspecialchars($pose['name']) : 'No name available';
                                    $poseLevelHtml = isset($pose['difficulty_level']) ? htmlspecialchars($pose['difficulty_level']) : 'Unknown';
                                    ?>
                                    <img src="frames/<?php echo $poseName; ?>.png" alt="<?php echo $poseNameHtml; ?>">
                                    <div>
                                        <strong><?php echo $poseNameHtml; ?></strong>
                                        <span>Level: <?php echo $poseLevelHtml; ?></span>
                                    </div>
                                </div>
                            </label>
                        </li>
                    <?php endforeach; ?>

                </ul>
                <button type="submit" name="create_sequence">Create Sequence</button>
            </form>
        </section>

        <section class="saved-sequences">
            <h2>Saved Sequences</h2>
            <ul class="poses-list">
                <?php foreach ($sequences as $sequence): ?>
                    <li class="pose">
                        <h3><?php echo htmlspecialchars($sequence['sequence_name']); ?></h3>
                        <ul>
                            <?php foreach ($sequence['pose_data'] as $pose): ?>
                                <li class="pose-item">
                                    <div class="container">
                                        <img src="frames/<?php echo urlencode($pose['name']); ?>.png"
                                            alt="<?php echo htmlspecialchars($pose['name']); ?>">
                                        <div>
                                            <strong><?php echo htmlspecialchars($pose['name']); ?></strong>
                                            <span>Duration: <?php echo htmlspecialchars($pose['duration']); ?> seconds</span>
                                        </div>
                                        <audio controls>
                                            <source src="audio/<?php echo urlencode($pose['name']); ?>.mp3" type="audio/mpeg">
                                            Your browser does not support the audio element.
                                        </audio>
                                    </div>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    </li>
                <?php endforeach; ?>
            </ul>
        </section>
    </main>

    <?php
    // Handle form submission
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['create_sequence'])) {
        $selectedPoses = $_POST['selected_poses'] ?? [];
        $poseSequence = getOrCreateSequence(array_map(function ($poseName) {
            return ['name' => $poseName];
        }, $selectedPoses));

        if (isset($poseSequence['error'])) {
            echo "<p>Error creating sequence: " . htmlspecialchars($poseSequence['error']) . "</p>";
        } else {
            echo "<p>Sequence created successfully.</p>";
            // Optionally refresh or redirect to display updated sequences
        }
    }
    ?>
</body>

</html>