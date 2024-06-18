<?php
echo "<h1>Directory Listing</h1>";
echo "<ul>";
foreach (glob("*.*") as $filename) {
    echo "<li><a href='$filename'>$filename</a></li>";
}
echo "</ul>";
?>
