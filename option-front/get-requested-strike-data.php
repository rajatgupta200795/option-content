<?php
//header('Content-type: application/json');

$strike_price = $_REQUEST["strike_price"];
$expiry_date = $_REQUEST["expiry_date"];
$req_date = $_REQUEST["req_date"];
$req_date = explode("/",$req_date);
$req_date = $req_date[2]."".$req_date[1].$req_date[0];
$tag = $_REQUEST["tag"];

$result = "";

if ($strike_price !== "" && $expiry_date !== "") {
//$result = shell_exec("query-executer.sh'".$strike_price."' '".$expiry_date."'");
$result = shell_exec("/var/www/html/query-executer.sh ".$strike_price." ".$expiry_date." ".$tag." ".$req_date);
}

echo $result;

?>
