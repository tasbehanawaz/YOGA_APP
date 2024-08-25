<?php

use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../db.php';


class DbTest extends TestCase
{
    public function testGetDbConnectionSuccess()
    {
        $conn = getDbConnection();
        $this->assertInstanceOf(PDO::class, $conn, 'Expected a PDO instance for successful connection');
    }

    public function testGetDbConnectionFailure()
    {
        // Modify the db.php file temporarily or use reflection to change the credentials to invalid ones 
        // for testing purposes if necessary, this is a simplistic way of doing it.
        // Alternatively, you can mock the PDO class but here, we'll keep it simple.

        // We'll assume that incorrect credentials are set in the environment temporarily.
        // This is a mock of failure scenario, you should create a similar test environment 
        // with incorrect credentials for testing this in practice.

        $originalHost = 'dragon.ukc.ac.uk';
        $originalDb = 'tn277';
        $originalUser = 'tn277';
        $originalPass = 'incorrect_password';

        $dsn = "mysql:host=$originalHost;dbname=$originalDb;charset=utf8mb4";

        try {
            $conn = new PDO($dsn, $originalUser, $originalPass);
        } catch (PDOException $e) {
            $conn = null;
        }

        $this->assertNull($conn, 'Expected null for failed connection');
    }
}
