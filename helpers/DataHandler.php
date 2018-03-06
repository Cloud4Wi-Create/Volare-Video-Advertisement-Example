<?php

$host = "localhost";
$user = "root";
$password = "password";
$db = "video_demo";

function createTable($mysqli) {
    // Create Table if it does not exist
    $createSettings = "CREATE TABLE IF NOT EXISTS settings (
        tenantID BIGINT PRIMARY KEY,
        videoUrl VARCHAR(6000),
        imageUrl VARCHAR(6000),
        timer SMALLINT UNSIGNED,
        continueBtn TINYTEXT,
        preCount TINYTEXT,
        leftCount TINYTEXT,
        rightCount TINYTEXT,
        postCount TINYTEXT
    );";
    $mysqli->query($createSettings);
}

function getSettings($tenant)
{
    global $host, $user, $password, $db;
    if(!is_numeric($tenant)) {
        $tenant = 1;
    }
    // Create default settings array
    $settings = array(
        'videoUrl' => 'video/video',
        'imageUrl' => 'images/poster_background.gif',
        'timer' => '10',
        'continueBtn' => 'Continue',
        'preCount' => 'Please watch this short video...',
        'leftCount' => 'Continue in ',
        'rightCount' => ' seconds...',
        'postCount' => '',
    );

    // Connect to MySQL
    $mysqli = new mysqli($host, $user, $password, $db);
    if ($mysqli->connect_errno) {
        echo "Failed to connect to MySQL: " . $mysqli->connect_error;
    }

    // Create Table if it does not exist
    createTable($mysqli);

    // Load from MySQL
    $res = $mysqli->query("SELECT * FROM settings WHERE tenantID='$tenant';");

    // Merge loaded into default settings
    if(!!$res && $res->num_rows == 1) {
        $settings = array_merge($settings, $res->fetch_assoc());
    }

    // Return result
    return $settings;
}

function setSettings($tenant, $settings)
{
    global $host, $user, $password, $db;
    if(!is_numeric($tenant)) {
        $tenant = 1;
    }
    $mysqli = new mysqli($host, $user, $password, $db);

    // Create Table if it does not exist
    createTable($mysqli);

    // Delete old row if it exists
    $res = $mysqli->query("DELETE FROM settings WHERE tenantID=$tenant;");

    // Insert settings into table
    $insertSettings = sprintf( <<< EndQuery
    Insert INTO settings (
        tenantID, videoUrl, imageUrl, timer, continueBtn, preCount, leftCount, rightCount, postCount)
        VALUES( '%d', '%s', '%s', '%d', '%s', '%s', '%s', '%s', '%s');
EndQuery
    ,$tenant, $settings['videoUrl'], $settings['imageUrl'], 
    $settings['timer'], $settings['continueBtn'], $settings['preCount'], 
    $settings['leftCount'], $settings['rightCount'], $settings['postCount']);

   $res = $mysqli->query($insertSettings);
}

// Log Saver
function addLog($tenant, $venueID, $userID, $timestamp)
{
    $logLine = $venueID . "," . $userID . "," . $timestamp;
    file_put_contents("./data/" . $tenant . ".txt", $logLine.PHP_EOL, FILE_APPEND | LOCK_EX);
}
