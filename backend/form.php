<?php
// Include the FetchYogaPoses.php script to use its functionality
require_once 'FetchYogaPoses.php';
$poseData = [];

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['poseName'])) {
    // Fetch the yoga pose by name
    $poseName = $_GET['poseName'];
    $poseData = fetchYogaPoseByName($poseName);
}
?>

<!DOCTYPE html> 
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yoga Poses</title>
    <link rel="stylesheet" href="style.css"> <!-- Ensure you have this CSS file for styling -->
</head>
<body>
    <header>
        <h1>Welcome to My Yoga App</h1>
    </header>
    <main>
        <section class="poses">
            <h2>Yoga Poses</h2>
            <div class="poses-list">
                <form action="form.php" method="GET">
                    <label for="poseName">Enter a yoga pose name:</label>
                    <input type="text" id="poseName" name="poseName" required>
                    <button type="submit">Search</button>
                </form>
                <?php
                // Display the pose if found
                if (!empty($poseData)) {
                    echo "<div class='pose'>";
                    echo "<h3>" . htmlspecialchars($poseData['english_name']) . "</h3>"; // Use the 'english_name' key from the API
                    // Choose url_png or url_svg based on your preference
                    if (!empty($poseData['url_png'])) {
                        echo "<img src='" . htmlspecialchars($poseData['url_png']) . "' alt='" . htmlspecialchars($poseData['english_name']) . "' />";
                    }
                    if (!empty($poseData['pose_description'])) {
                        echo "<p>" . htmlspecialchars($poseData['pose_description']) . "</p>";
                    }
                    echo "</div>";
                } else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                    echo "<p>No yoga poses found. Please try again.</p>";
                }
                ?>
            </div>
        </section>
    </main>
</body>
</html>