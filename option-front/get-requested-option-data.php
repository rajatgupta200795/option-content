<?php
//header('Content-type: application/json');

$expiry_date = $_REQUEST["expiry_date"];
$created = $_REQUEST["created"];


$result = "";

 if ($created !== "" && $expiry_date !== "") {
    //$result = shell_exec("query-executer.sh'".$strike_price."' '".$expiry_date."'");
    $result = shell_exec("/var/www/html/option-query-executer.sh ".$expiry_date." ".$created);
 }

echo $result;

?>

