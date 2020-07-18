<!DOCTYPE HTML>
<html>

<head>
<title>
Option Data Analysis
</title>

<style>
.unselectable {
-webkit-user-select: none;
-webkit-touch-callout: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
}
</style>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.10.1/bootstrap-table.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.10.1/bootstrap-table.min.js"></script>
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="js-include/table-formatting.js"></script>
<script src="js-include/strike-data-analysis-graphs.js?version=1"></script>

<script type="text/javascript">
var tag;

$(document).ready(function(){
$("#option_button").click(function(){
document.getElementById("created_link_text").innerHTML = "";
document.getElementById("table").removeAttribute("class");
document.getElementById("table").setAttribute("class", "tableOption");

var expiry_date = document.getElementById("option_expiry_date").value;
var req_date = document.getElementById("option_req_date").value;
var d = new Date();
tag = expiry_date+d.getTime();
var req_time = document.getElementById("option_req_time").value;
$.get("get-requested-created-data.php?expiry_date="+expiry_date+"&tag="+tag+"&req_date="+req_date+"&req_time="+req_time, function(data){
// Display the returned data in browser
var list = data;
createdString = String(JSON.parse(list));
createdStringSplit = createdString.split(",");

list="<b>Available data for: </b>";
for(i=0; i<createdStringSplit.length; i=i+1){
time=createdStringSplit[i].substr(8,12);
list = list+' <button type="button" class="btn btn-primary btn-sm" onclick=\'getOptionSheetData("'+expiry_date+'", "'+createdStringSplit[i]+'")\'> '+time.slice(0, 2)+":"+time.slice(2)+' </button> ';
}

$("#created_link_text").html(list);
//document.getElementById("table").innerHTML = "";
//constructTable(JSON.parse(data));
});
});
});

function getOptionSheetData(expiry_date, created){
document.getElementById("oiChartContainer").innerHTML = "";
document.getElementById("oiChangeChartContainer").innerHTML = "";
document.getElementById("table").innerHTML = "";
$.get("get-requested-option-data.php?expiry_date="+expiry_date+"&created="+created, function(data){
var list = data;
// document.write(list)
document.getElementById("table").innerHTML = "";
constructTable(JSON.parse(data));
});
}
//////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
$("#strike_button").click(function(){

document.getElementById("created_link_text").innerHTML = "";
document.getElementById("oiChartContainer").innerHTML = "";
document.getElementById("oiChangeChartContainer").innerHTML = "";
document.getElementById("table").innerHTML = "";

document.getElementById("table").removeAttribute("class");
document.getElementById("table").setAttribute("class", "tableStrike");

var strike_price = document.getElementById("strike_price").value;
var expiry_date = document.getElementById("expiry_date").value;
var req_date = document.getElementById("req_date").value;
var d = new Date();
tag = strike_price+expiry_date+d.getTime();

$.get("get-requested-strike-data.php?strike_price="+strike_price+"&expiry_date="+expiry_date+"&tag="+tag+"&req_date="+req_date, function(data){
// Display the returned data in browser
//$("#created_link_text").text(data);
var list = data;
//document.write(list);
document.getElementById("table").innerHTML = "";
constructTable(JSON.parse(data));
});
});
});

function constructTable(list, selector='#table') {
// Getting the all column names
var cols = Headers(list, selector);
// Traversing the JSON data
for (var i = 0; i < list.length; i++) {
var row = $('<tr/>');
for (var colIndex = 0; colIndex < cols.length; colIndex++)
{
var val = list[i][cols[colIndex]];
if (val == null) val = "";
row.append($('<td/>').html(val));
}
$(selector).append(row);
}

tableFormatting();
strikeBarGraph();

}


function Headers(list, selector) {
var columns = [];
var header = $('<tr/>');

for (var i = 0; i < list.length; i++) {
var row = list[i];

for (var k in row) {
if ($.inArray(k, columns) == -1) {
columns.push(k);
// Creating the header
header.append($('<th/>').html(k));
}
}
}
$(selector).append(header);
return columns;
}

</script>

</head>
<body class="unselectable" style="font-family: Arial, Helvetica, sans-serif;">

<?php
$all_dates = shell_exec("sudo /var/www/html/all-dates-query-executer.sh");
$all_dates = str_replace('[', '', $all_dates);
$all_dates = str_replace(']', '', $all_dates);
$all_dates = explode(',', $all_dates);
?>

<div class="container">
<h2>Nifty Option Data Analysis</h2>
<p>Enjoy free Nifty option data recording for all expiry with graphs and historical data.</p>

<iframe src="https://platform.twitter.com/widgets/follow_button.html?screen_name=rajatgupta207&show_screen_name=false&show_count=true&size=l" title="Follow Rajat Gupta on Twitter"
width="300" height="40" style="border: 0; overflow: hidden;" ></iframe>
<br>

<a>Back</a>

<form class="hidde" id="strike_form">

<?php include"php-include/strike-form.php"; ?>

</form>

<br><br>
<div style="text-align:right;"><a href="" id="downloadFileId"></a></div>
<br>
</div>

<div class="container-fluid">
<style>
div.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}

.tableOption th {
  background-color: #e0e0e0;
  position: relative;
  position: sticky;
  top: 38px;
}
.tableStrike th {
  background-color: #e0e0e0;
  position: relative;
  position: sticky;
  top: 0px;
}

table {
//   border-collapse:separate;
  border-spacing: 0 1em;
}
</style>

<div class="sticky"><div id="created_link_text" style="padding: 5px; background-color: white;"></div></div>


<div class="row">
<div class="col-sm-6">
<div id="spotChartContainer" style="height: 250px; width: 100%;"></div>
</div>
<div class="col-sm-6">
<div id="oiChartContainer" style="height: 250px; width: 100%;"></div>
</div>
<div class="col-sm-0">
<div id="oiChangeChartContainer" style="height: 250px; width: 100%;"></div>
</div>
</div>

<br>

<div class="row">
<div class="col-sm-4">
<div id="callPremiumChartContainer" style="height: 250px; width: 100%;"></div>
</div>
<div class="col-sm-4">
<div id="callOIChangeChartContainer" style="height: 250px; width: 100%;"></div>
</div>
<div class="col-sm-4">
<div id="callIVChartContainer" style="height: 250px; width: 100%;"></div>
</div>
</div>

<br>

<div class="row">
<div class="col-sm-4">
<div id="putPremiumChartContainer" style="height: 250px; width: 100%;"></div>
</div>
<div class="col-sm-4">
<div id="putOIChangeChartContainer" style="height: 250px; width: 100%;"></div>
</div>
<div class="col-sm-4">
<div id="putIVChartContainer" style="height: 250px; width: 100%;"></div>
</div>
</div>


<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
</br>
<hr>
<table style="font-size:14px; border-color: #aca99f; border-spacing: 5px;" id="table" class="tableOption" border="1px"></table>
</div>

</body>
</html>
