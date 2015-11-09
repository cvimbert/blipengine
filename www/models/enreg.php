<?php
header("Access-Control-Allow-Origin: *");
file_put_contents($_POST["filename"], $_POST["model"]);
?>