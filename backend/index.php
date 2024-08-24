<?php

// Get the requested URI
$request = $_SERVER['REQUEST_URI'];

// Remove query string from the request URI
$request = strtok($request, '?');

// Define the routes and their corresponding files
$routes = [
    '/FetchAllYogaPoses.php' => 'FetchAllYogaPoses.php',
    '/FetchYogaPoses.php' => 'FetchYogaPoses.php',
    '/fetch_previous_videos.php' => 'fetch_previous_videos.php',
    '/fetch_user_videos.php' => 'fetch_user_videos.php',
    '/generate_all_pose_audio.php' => 'generate_all_pose_audio.php',
    '/generate_audio.php' => 'generate_audio.php',
    '/generate_video.php' => 'generate_video.php',
    '/get_random_videos.php' => 'get_random_videos.php',
    '/get_saved_poses.php' => 'get_saved_poses.php',
    '/get_saved_video.php' => 'get_saved_video.php',
    '/get_user.php' => 'get_user.php',
    '/login.php' => 'login.php',
    '/logout.php' => 'logout.php',
    '/program.php' => 'program.php',
    '/register.php' => 'register.php',
    '/reset_saved_poses.php' => 'reset_saved_poses.php',
    '/save_all_poses.php' => 'save_all_poses.php',
    '/save_pose.php' => 'save_pose.php',
    '/save_video.php' => 'save_video.php',
    '/searchPoses.php' => 'searchPoses.php',
    '/signin.php' => 'signin.php',
    '/signout.php' => 'signout.php',
    '/test_generate_audio.php' => 'test_generate_audio.php',
    '/test_generate_video.php' => 'test_generate_video.php',
    '/test_pose_audio.php' => 'test_pose_audio.php',
    '/test_sequences.php' => 'test_sequences.php',
    '/verify_env.php' => 'verify_env.php',
];

// Check if the requested route exists in the routes array
if (array_key_exists($request, $routes)) {
    include $routes[$request];
} else {
    // Default to directory listing if no route matches
    echo "<h1>Directory Listing</h1>";
    echo "<ul>";
    foreach (glob("*.*") as $filename) {
        echo "<li><a href='$filename'>$filename</a></li>";
    }
    echo "</ul>";
}
