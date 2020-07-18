<?php

$expiry_date = $_REQUEST["expiry_date"];
$created = $_REQUEST["created"];
$tag = $_REQUEST["tag"];

$result = "";

if ($created !== "" && $expiry_date !== "") {
$result = shell_exec("sudo /var/www/html/download-csv-option-query-executer.sh ".$expiry_date." ".$created." ".$tag);
}
echo "hi";
?>

