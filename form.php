<!-- Add a form to the page that could take an input from the user and produce result -->

<!DOCTYPE html> 
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yoga Poses</title>
    <link rel="stylesheet" href="css/style.css"> <!-- Ensure you have this CSS file for styling -->
</head>
<body>
    <header>
        <h1>Welcome to My Yoga App</h1>
    </header>
    <main>
        <section class="poses">
            <h2>Yoga Poses</h2>
            <div class="poses-list
            ">
                <form action="form.php" method="POST">
                    <label for="poseName">Enter a yoga pose name:</label>
                    <input type="text" id="poseName" name="poseName" required>
                    <button type="submit">Search</button>
                </form>
                <?php
                // Include the FetchYogaPoses.php script to use its functionality
                require_once 'FetchYogaPoses.php';
                
                // Check if the form was submitted
                if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                    // Fetch the yoga pose by name
                    $poseName = $_POST['poseName'];
                    $poses = fetchYogaPoseByName($poseName);
                    
                    // Display the pose if found
                    if (!empty($poses)) {
                        echo "<div class='pose'>";
                        echo "<h3>" . htmlspecialchars($poses['english_name']) . "</h3>"; // Use the 'english_name' key from the API
                        // Choose url_png or url_svg based on your preference
                        if (!empty($poses['url_png'])) {
                            echo "<img src='" . htmlspecialchars($poses['url_png']) . "' alt='" . htmlspecialchars($poses['english_name']) . "' />";
                        }
                        if (!empty($poses['pose_description'])) {
                            echo "<p>" . htmlspecialchars($poses['pose_description']) . "</p>";
                        }
                        echo "</div>";
                    } else {
                        echo "<p>No yoga poses found. Please try again.</p>";
                    }
                }
                ?>