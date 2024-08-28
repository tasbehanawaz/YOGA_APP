<?php
use PHPUnit\Framework\TestCase;

// Only include once to avoid redeclaration errors
require_once 'fetchAllYogaPoses.php';
require_once 'db.php';

class FetchAllYogaPosesTest extends TestCase
{
    protected function setUp(): void
    {
        $_SERVER['REQUEST_METHOD'] = 'POST'; // Mocking the request method
    }

    public function testFetchAllYogaPoses()
    {
        // Simulate the JSON input for POST request
        $inputData = json_encode(['level' => 'all']);
        
        // Mock php://input
        $this->setMockInput($inputData);

        ob_start();
        include 'fetchAllYogaPoses.php';
        $output = ob_get_clean();

        $response = json_decode($output, true);

        $this->assertArrayHasKey('status', $response);
        $this->assertEquals('success', $response['status']);
        $this->assertIsArray($response['data']);
    }

    protected function setMockInput($data)
    {
        stream_wrapper_unregister('php');
        stream_wrapper_register('php', 'MockPhpStream');
        file_put_contents('php://input', $data);
    }

    protected function tearDown(): void
    {
        stream_wrapper_restore('php');
    }
}

class MockPhpStream {
    private $index;
    private $data;

    public function stream_open($path, $mode, $options, &$opened_path) {
        $this->index = 0;
        $this->data = file_get_contents('php://memory');
        return true;
    }

    public function stream_read($count) {
        $ret = substr($this->data, $this->index, $count);
        $this->index += strlen($ret);
        return $ret;
    }

    public function stream_eof() {
        return $this->index >= strlen($this->data);
    }

    public function stream_write($data) {
        $this->data .= $data;
        return strlen($data);
    }

    public function stream_tell() {
        return $this->index;
    }

    public function stream_seek($offset, $whence) {
        $this->index = $offset;
        return true;
    }

    public function stream_stat() {
        return [];
    }
}
