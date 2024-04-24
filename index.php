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
                        <li><a href="/program.php">Program</a></li>
                        <li><a href="/categories.php">Categories</a></li>
                        <li>
                            <div class="center">
                                <form action="" class="searchbar">
                                    <input type="text" name="search-input" placeholder="Search poses">
                                    <button type="submit">Enter</button>

                                </form>
                            </div>
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