<?php

include "./helpers/APIHandlers.php";
include "./helpers/DataHandler.php";
include "./helpers/template.php";

if (isset($_GET['sk'])) {
    $context = getContext($_GET['sk']);
    $settings = getSettings($context['tenant']);

    setcookie("context", json_encode($context), time() + 86400, "/");

    $index = new Template("./views/index.html");
    $index->render($settings);
} else {
    // Was not a GET with a session key, so must be a POST
    $context = array();
    $json = json_decode(file_get_contents("php://input"), true);

    if (!isset($_COOKIE["context"])) {
        // Fallback on API call if cookies do not work
        $context = getContext($json['sk']);
    } else { 
        // Pulling context from cookie to avoid slow API call
        $context = json_decode($_COOKIE["context"], true);
    }

    // Check if context has been set before tryint to write with it
    if (isset($context)) {
        $timestamp = date('Y-m-d,H:i:s(T)');
        addLog($context['tenant'], $context['hotspot'], $context['customer'], $timestamp);
    } else {
        // Context hasn't been set so something went wrong somewhere
    }
}
