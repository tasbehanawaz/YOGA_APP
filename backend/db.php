<?php
// In summary, this file provides a function that can be used to establish a connection to a MySQL database using PDO.
function getDbConnection()
{
    $host = 'dragon.kent.ac.uk'; // Your database host
    $db = 'tn277'; // Your database name
    $user = 'tn277'; // Your database username
    $pass = 'topo1op'; // Your database password
    $charset = 'utf8mb4';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    try {
        $conn = new PDO($dsn, $user, $pass, $options);
        return $conn;
    } catch (PDOException $e) {
        echo "PDOException: " . $e->getMessage();
        return null;
    }
}
