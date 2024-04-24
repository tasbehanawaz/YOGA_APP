<?php
// Include the FetchYogaPoses.php script to use its functionality
require_once 'FetchYogaPoses.php';

// Assuming FetchYogaPoses returns an array of poses
$poses = fetchYogaPoseByName("butterfly"); // Make sure this function exists in FetchYogaPoses.php and returns the desired data

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
            <!--<h2>Yoga Poses</h2>-->

            <div class="nav_bar">
                <nav>
                    <ul class="container">
                        <li class="logo"><a href="#">Logo</a></li>
                        <li><a href="#">Program</a></li>
                        <li><a href="#">Categories</a></li>
                        <li class="search-container">
                            <input type="text" class="search-input" placeholder="Search poses">
                            <!-- SVG icon here or use an <img> tag with alt attribute -->
                            <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 
                            40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                            </svg> -->
                        </li>
                        <li><a href="#">Login</a></li>
                    </ul>
                </nav>
            </div>

            <div class="poses-list">
                <?php
                // If the function is modified to return a single pose, no loop is needed.
                // Directly access the pose data.
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
                    echo "<p>No yoga poses found. Please try again later.</p>";
                }
                ?>
            </div>

        </section>
    </main>
    <footer>
        <p>&copy; <?php echo date('Y'); ?> My Yoga App</p>
    </footer>
</body>

</html>