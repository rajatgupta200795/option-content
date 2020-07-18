<?php
//header('Content-type: application/json');

$expiry_date = $_REQUEST["expiry_date"];
$tag = $_REQUEST["tag"];
$req_date = $_REQUEST["req_date"];
$req_date = explode("/",$req_date);
$req_date = $req_date[2]."".$req_date[1].$req_date[0];
$req_time = explode("To", str_replace(" ", "", $_REQUEST["req_time"]));

$time1 = str_replace(":", "", $req_time[0]);
if(strlen($time1) == 3) $time1 = "0".$time1;
$created1 = $req_date."".$time1;
$time2 = str_replace(":", "", $req_time[1]);
if(strlen($time2) == 3) $time2 = "0".$time2;
$created2 = $req_date."".$time2;


$result = "";

 if ($strike_price !== "" && $expiry_date !== "") {
    //$result = shell_exec("query-executer.sh'".$strike_price."' '".$expiry_date."'");
    $result = shell_exec("/var/www/html/created-query-executer.sh ".$expiry_date." ".$created1." ".$created2);
 }

echo $result;

?>
