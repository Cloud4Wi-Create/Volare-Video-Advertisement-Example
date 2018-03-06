<?php

require "./helpers/APIHandlers.php";
require "./helpers/DataHandler.php";
require "./helpers/template.php";

if (!isset($_GET['sk'])) { // If GET request
    $data = json_decode(file_get_contents("php://input"), true);
    
    setSettings($data['tenantId'], $data);

    echo "success!";
} else {
    $context = getContext($_GET['sk']);
    $settings = getSettings($context['tenant']);

    $page = new Template("./views/settings.html");
    $page->render(array_merge($context, $settings));
}