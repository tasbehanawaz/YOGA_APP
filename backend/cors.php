<?php
// List of allowed origins
$allowed_origins = [
    'http://localhost:5173',
    'https://yogaposesapp.netlify.app', // Add other allowed origins here
];

// Get the origin of the incoming request
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

// Check if the origin is allowed
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("HTTP/1.1 403 Forbidden");
    echo "Invalid requester.";
    exit;
}
