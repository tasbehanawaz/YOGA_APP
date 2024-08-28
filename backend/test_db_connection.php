<?php
require 'db.php';

function testDbConnection()
{
    $conn = getDbConnection();
    if ($conn) {
        echo "Connection successful!";

        // Perform a simple query to test the connection
        $stmt = $conn->query("SELECT 1");
        $result = $stmt->fetch();

        if ($result) {
            echo "Query executed successfully!";
        } else {
            echo "Query failed!";
        }
    } else {
        echo "Connection failed!";
    }
}

testDbConnection();
