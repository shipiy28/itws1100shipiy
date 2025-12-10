<?php
include('quiz3config.php');

$DB_HOST = $GLOBALS['DB_HOST'];
$DB_USER = $GLOBALS['DB_USERNAME'];
$DB_PASS = $GLOBALS['DB_PASSWORD'];
$DB_NAME = $GLOBALS['DB_NAME'];

$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ($mysqli->connect_error) {
    http_response_code(500);
    exit('Database connection error');
}

// Handle GET request - fetch approved comments
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $mysqli->prepare("SELECT visitorName, commentText FROM siteComments WHERE status = 'approved' ORDER BY id DESC");
    if (!$stmt) {
        http_response_code(500);
        exit('Prepare failed');
    }
    
    $stmt->execute();
    $result = $stmt->get_result();
    $comments = [];
    
    while ($row = $result->fetch_assoc()) {
        $comments[] = $row;
    }
    
    header('Content-Type: application/json');
    echo json_encode($comments);
    
    $stmt->close();
    $mysqli->close();
    exit;
}

// Handle POST request - submit new comment
$visitorName = trim($_POST['visitorName'] ?? '');
$emailAddress = trim($_POST['emailAddress'] ?? '');
$commentText = trim($_POST['commentText'] ?? '');

// basic validation
if ($visitorName === '' || $emailAddress === '' || $commentText === '' || !filter_var($emailAddress, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    exit('Invalid input');
}

// prepared statement to avoid SQL injection
$stmt = $mysqli->prepare("INSERT INTO siteComments (visitorName, emailAddress, commentText, status) VALUES (?, ?, ?, 'pending')");
if (!$stmt) {
    http_response_code(500);
    exit('Prepare failed');
}
$stmt->bind_param('sss', $visitorName, $emailAddress, $commentText);

if ($stmt->execute()) {
    echo 'Comment submitted successfully';
} else {
    http_response_code(500);
    echo 'Database error: ' . $mysqli->error;
}

$stmt->close();
$mysqli->close();
?>