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

<script type="text/javascript">
var tag;

$(document).ready(function(){
$("#option_button").click(function(){
document.getElementById("created_link_text").innerHTML = "";
document.getElementById("downloadFileId").innerHTML = "";
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
document.getElementById("tempCreatedVar").innerHTML = created;
document.getElementById("oiChartContainer").innerHTML = "";
document.getElementById("downloadFileId").innerHTML = "";
document.getElementById("oiChangeChartContainer").innerHTML = "";
document.getElementById("table").innerHTML = "";
$.get("get-requested-option-data.php?expiry_date="+expiry_date+"&created="+created, function(data){
var list = data;
// document.write(list)
document.getElementById("table").innerHTML = "";
constructTable(JSON.parse(data));
document.getElementById("downloadFileId").innerHTML = "Download CSV File";
});
}
//////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
$("#strike_button").click(function(){
document.getElementById("downloadFileId").innerHTML = "";
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

jQuery.each($("table tr"), function() {
$(this).children(":eq(2)").after($(this).children(":eq(9)"));
$(this).children(":eq(3)").after($(this).children(":eq(10)"));
$(this).children(":eq(4)").after($(this).children(":eq(10)"));
$(this).children(":eq(5)").after($(this).children(":eq(9)"));
$(this).children(":eq(6)").after($(this).children(":eq(0)"));
$(this).children(":eq(6)").after($(this).children(":eq(11)"));
$(this).children(":eq(8)").after($(this).children(":eq(11)"));

$(this).children(":eq(11)").after($(this).children(":eq(26)"));
$(this).children(":eq(12)").after($(this).children(":eq(25)"));
$(this).children(":eq(13)").after($(this).children(":eq(26)"));

$(this).children(":eq(14)").after($(this).children(":eq(20)"));
$(this).children(":eq(15)").after($(this).children(":eq(20)"));
$(this).children(":eq(16)").after($(this).children(":eq(22)"));
$(this).children(":eq(17)").after($(this).children(":eq(21)"));
$(this).children(":eq(18)").after($(this).children(":eq(26)"));
$(this).children(":eq(20)").after($(this).children(":eq(23)"));

$(this).children(":eq(21)").after($(this).children(":eq(24)"));
$(this).children(":eq(22)").after($(this).children(":eq(26)"));
$(this).children(":eq(23)").after($(this).children(":eq(26)"));
$(this).children(":eq(24)").after($(this).children(":eq(26)"));
//
// $(this).children(":eq(8)").after($(this).children(":eq(20)"));
// $(this).children(":eq(16)").after($(this).children(":eq(21)"));

//$(this).children(":eq(23)").after($(this).children(":eq(25)"));


$(this).children("td:eq(10)").css("color", "#3a3d7d");
$(this).children("td:eq(12)").css("color", "#080f2bf5");
$(this).children("td:eq(13)").css("color", "#3a3d7d"); // #2e7b7bf5
$(this).children("td:eq(14)").css("color", "#3a3d7d");
$(this).children("td:eq(16)").css("color", "#3a3d7d");

var greek_background = "#d9e4e4fa" // "#f5fffa"
$(this).children("td:eq(0)").css("background-color", greek_background);
$(this).children("td:eq(1)").css("background-color", greek_background);
$(this).children("td:eq(2)").css("background-color", greek_background);
$(this).children("td:eq(3)").css("background-color", greek_background);
$(this).children("td:eq(4)").css("background-color", greek_background);

$(this).children("td:eq(22)").css("background-color", greek_background);
$(this).children("td:eq(23)").css("background-color", greek_background);
$(this).children("td:eq(24)").css("background-color", greek_background);
$(this).children("td:eq(25)").css("background-color", greek_background);
$(this).children("td:eq(26)").css("background-color", greek_background);

var mid_background_color = "#d9e4e4fa"  //"#e7e3d5"
$(this).children("td:eq(12)").css("background-color", mid_background_color);
$(this).children("td:eq(13)").css("background-color", mid_background_color);
$(this).children("td:eq(14)").css("background-color", mid_background_color);

$(this).children("td:eq(0)").css("text-align", "center");
$(this).children("td:eq(1)").css("text-align", "center");
$(this).children("td:eq(2)").css("text-align", "center");
$(this).children("td:eq(3)").css("text-align", "center");
$(this).children("td:eq(12)").css("text-align", "center");
$(this).children("td:eq(13)").css("text-align", "center");
$(this).children("td:eq(14)").css("text-align", "center");
$(this).children("td:eq(23)").css("text-align", "center");
$(this).children("td:eq(24)").css("text-align", "center");
$(this).children("td:eq(25)").css("text-align", "center");
$(this).children("td:eq(26)").css("text-align", "center");
});

var greek_color = "#e0e0e0";
$('table tr:eq(0) th:eq(0)').css("background-color", greek_color);
$('table tr:eq(0) th:eq(1)').css("background-color", greek_color);
$('table tr:eq(0) th:eq(2)').css("background-color", greek_color);
$('table tr:eq(0) th:eq(3)').css("background-color", greek_color);
$('table tr:eq(0) th:eq(4)').css("background-color", greek_color);
$('table tr:eq(0) th:eq(22)').css("background-color", greek_color);
$('table tr:eq(0) th:eq(23)').css("background-color", greek_color);
$('table tr:eq(0) th:eq(24)').css("background-color", greek_color);
$('table tr:eq(0) th:eq(25)').css("background-color", greek_color);
$('table tr:eq(0) th:eq(26)').css("background-color", greek_color);

$('table tr:eq(0) th:eq(0)').text("Delta");
$('table tr:eq(0) th:eq(1)').text("Gamma");
$('table tr:eq(0) th:eq(2)').text("Theta");
$('table tr:eq(0) th:eq(3)').text("Vega");
$('table tr:eq(0) th:eq(4)').text("Rho");
$('table tr:eq(0) th:eq(5)').text("OI");
$('table tr:eq(0) th:eq(6)').text(" Change in OI");
$('table tr:eq(0) th:eq(7)').text("Volumes");
$('table tr:eq(0) th:eq(8)').text("IV");
$('table tr:eq(0) th:eq(9)').text("Theory LTP");
$('table tr:eq(0) th:eq(10)').text("LTP");
$('table tr:eq(0) th:eq(11)').text("Net Change");
$('table tr:eq(0) th:eq(12)').text(" Time ");
$('table tr:eq(0) th:eq(13)').text("Spot Price");
$('table tr:eq(0) th:eq(14)').text("Strike Price");
$('table tr:eq(0) th:eq(15)').text("Net Change");
$('table tr:eq(0) th:eq(16)').text("LTP");
$('table tr:eq(0) th:eq(17)').text("Theory LTP");
$('table tr:eq(0) th:eq(18)').text("IV");
$('table tr:eq(0) th:eq(19)').text("Volume");
$('table tr:eq(0) th:eq(20)').text("Change in OI");
$('table tr:eq(0) th:eq(21)').text(" OI ");
$('table tr:eq(0) th:eq(22)').text("Rho");
$('table tr:eq(0) th:eq(23)').text("Vega");
$('table tr:eq(0) th:eq(24)').text("Theta");
$('table tr:eq(0) th:eq(25)').text("Gamma");
$('table tr:eq(0) th:eq(26)').text("Delta");

function numberWithCommas(number) {
var parts = number.toString().split(".");
parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
return parts.join(".");
}

$(document).ready(function() {
$("table tr").each(function() {
var num0 = $(this).children(":eq(4)").text();
var num1 = $(this).children(":eq(5)").text();
var num2 = $(this).children(":eq(6)").text();
var num12 = $(this).children(":eq(18)").text();
var num13 = $(this).children(":eq(19)").text();
var num14 = $(this).children(":eq(20)").text();
$(this).children(":eq(4)").text(numberWithCommas(num0));
$(this).children(":eq(5)").text(numberWithCommas(num1));
$(this).children(":eq(6)").text(numberWithCommas(num2));
$(this).children(":eq(18)").text(numberWithCommas(num12));
$(this).children(":eq(19)").text(numberWithCommas(num13));
$(this).children(":eq(20)").text(numberWithCommas(num14));
});
});

$(document).ready(function() {
$( "table tr").each(function(){
var value1 = parseFloat( $(this).children("td:eq(5)").text() );
var value2 = parseFloat( $(this).children("td:eq(10)").text() );

var value3 = parseFloat( $(this).children("td:eq(14)").text() );
var value4 = parseFloat( $(this).children("td:eq(19)").text() );

//document.write(value)
if (value1 < 0 ){
$( this ).children(":eq(5)").css('color', 'red');
}
else if(value1 > 0){
$( this ).children(":eq(5)").css('color', 'green');
}
if (value2 < 0){
$( this ).children(":eq(10)").css('color', 'red');
}
else if(value2 > 0){
$( this ).children(":eq(10)").css('color', 'green');
}

if (value3 < 0 ){
$( this ).children(":eq(14)").css('color', 'red');
}
else if(value3 > 0){
$( this ).children(":eq(14)").css('color', 'green');
}
if (value4 < 0){
$( this ).children(":eq(19)").css('color', 'red');
}
else if(value4 > 0){
$( this ).children(":eq(19)").css('color', 'green');
}
});
});

$('table tr').find('td:eq(4),th:eq(4)').remove();
$('table tr').find('td:eq(21),th:eq(21)').remove();

$( "td").attr("width","100");
$('th').css('text-align', 'center');
$('tr').css('text-align', 'right');

//document.getElementById("downloadFileId").href =  "download-option-chain-data.php"; //"/csvFiles/"+tag+".csv";

// document.getElementById("test1").innerHTML = ce_oi;
//document.getElementById("test2").innerHTML = time;
//document.getElementById("test3").innerHTML = pe_oi;

///////////////////////////                         /////////////////////////////

var optionClassName = document.getElementById("sheet_form").className;
if(optionClassName != "hidden")
optionBarGraph();
else
strikeBarGraph();


function strikeBarGraph(){
var ce_oi = [];
var ce_change_oi = [];
var pe_oi = [];
var pe_change_oi = [];
var time = [];
$("#table tr").each(function(){
ce_oi.push($(this).find("td:eq(4)").text());
ce_change_oi.push($(this).find("td:eq(5)").text());
time.push($(this).find("td:eq(11)").text());
pe_change_oi.push($(this).find("td:eq(19)").text());
pe_oi.push($(this).find("td:eq(20)").text());
});

a = time
b = ce_oi
c = pe_oi
titleFontSize = 17

var limit = a.length;
var data = [];

data1 ={
type: "spline",
name: "OI in CE",
showInLegend: true,
}

data2 ={
type: "spline",
name: "OI in PE",
showInLegend: true,
}

var dataPoints = [];
for (var i = 1; i < limit; i += 1) {
//dateStr = '1970-01-01T' + a[i].slice(0, 2) + ":" + a[i].slice(2) + ":00.000+05:30";
//var dateStr = 'Thu, 01 Jan 1970 '+a[i].slice(0, 2) + ":" + a[i].slice(2)+':00 GMT+0530';
// xVal = Date.parse(dateStr);
// document.write(dateStr+"="+xVal+" ")
xVal = parseInt(a[i]);
dataPoints.push({
x: xVal,
y: parseInt(b[i])
});
}
data1.dataPoints = dataPoints;

var dataPoints = [];
for (var i = 0; i < limit; i += 1) {
xVal = parseInt(a[i]);
dataPoints.push({
x: xVal,
y: parseInt(c[i])
});
}
data2.dataPoints = dataPoints;

data.push(data1)
data.push(data2)

var chart = new CanvasJS.Chart("oiChartContainer", {
animationEnabled: true,
zoomEnabled: true,
title:{
fontSize: titleFontSize,
text: "Open Interest with Time"
},
axisX: {
title: "Time"
},
axisY :{
title: "Open Interest"
//includeZero:false
},
toolTip: {
shared: true
},
legend:{
cursor:"pointer",
itemclick: toggleDataSeries
},
data: data
});
chart.render();

///////////////////////////////////// change in OI start in strike section

a = time
b = ce_change_oi
c = pe_change_oi

var limit = a.length;
var data = [];

data1 ={
type: "spline",
name: "OI Change in CE",
showInLegend: true,
}

data2 ={
type: "spline",
name: "OI Change in PE",
showInLegend: true,
}

var dataPoints = [];
for (var i = 1; i < limit; i += 1) {
//dateStr = '1970-01-01T' + a[i].slice(0, 2) + ":" + a[i].slice(2) + ":00.000+05:30";
//var dateStr = 'Thu, 01 Jan 1970 '+a[i].slice(0, 2) + ":" + a[i].slice(2)+':00 GMT+0530';
// xVal = Date.parse(dateStr);
// document.write(dateStr+"="+xVal+" ")
xVal = parseInt(a[i]);
dataPoints.push({
x: xVal,
y: parseInt(b[i])
});
}
data1.dataPoints = dataPoints;

var dataPoints = [];
for (var i = 0; i < limit; i += 1) {
xVal = parseInt(a[i]);
dataPoints.push({
x: xVal,
y: parseInt(c[i])
});
}
data2.dataPoints = dataPoints;

data.push(data1)
data.push(data2)

var chart = new CanvasJS.Chart("oiChangeChartContainer", {
animationEnabled: true,
zoomEnabled: true,
title:{
fontSize: titleFontSize,
text: "OI Change with Time"
},
axisX: {
title: "Time",
},
axisY :{
title: "OI Change"
//includeZero:false
},
toolTip: {
shared: true
},
legend:{
cursor:"pointer",
itemclick: toggleDataSeries
},
data: data
});
chart.render();

/////////////////////////////////////////////// change in oi in strike section closed


function toggleDataSeries(e) {
	if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	}
	else {
		e.dataSeries.visible = true;
	}
	chart.render();
}
}

//////////////////////////////////////////////////////////////////

function optionBarGraph(){
var ce_oi = [];
var ce_change_oi = [];
var pe_oi = [];
var pe_change_oi = [];
var strike = [];
$("#table tr").each(function(){
ce_oi.push($(this).find("td:eq(4)").text());
ce_change_oi.push($(this).find("td:eq(5)").text());
strike.push($(this).find("td:eq(13)").text());
pe_change_oi.push($(this).find("td:eq(19)").text());
pe_oi.push($(this).find("td:eq(20)").text());
});

limit = strike.length
start = 20
end = limit-11
a = strike.slice(start, end)
b = ce_oi.slice(start, end)
c = pe_oi.slice(start, end)
titleFontSize = 17

var data = [];

data1 = {
type: "column",
name: "CE Open Interest",
legendText: "CE Open Interest",
showInLegend: true,
};

data2 =	{
type: "column",
name: "PE Open Interest",
legendText: "PE Open Interest",
// axisYType: "secondary",
showInLegend: true,
};

var dataPoints = [];
for (var i = 0; i < limit; i += 1) {
dataPoints.push({
x: parseInt(a[i]),
y: parseInt(b[i])
});
}
data1.dataPoints = dataPoints;

var dataPoints = [];
for (var i = 0; i < limit; i += 1) {
dataPoints.push({
x: parseInt(a[i]),
y: parseInt(c[i])
});
}
data2.dataPoints = dataPoints;

data.push(data1)
data.push(data2)

var chart = new CanvasJS.Chart("oiChartContainer", {
animationEnabled: true,
title:{
fontSize: titleFontSize,
text: "Open Interest Positions"
},
axisX: {
interval: 200
},
axisY: {
title: "Open Interest",
titleFontColor: "#000",
lineColor: "#000",
labelFontColor: "#000",
tickColor: "#000"
},
axisY2: {
title: "PE Open Interest",
titleFontColor: "#C0504E",
lineColor: "#C0504E",
labelFontColor: "#C0504E",
tickColor: "#C0504E"
},
toolTip: {
shared: true
},
legend: {
cursor:"pointer",
itemclick: toggleDataSeries
},
data: data
});
chart.render();

////////////////////////////////////// change in OI

limit = strike.length
a = strike.slice(start, end)
b = ce_change_oi.slice(start, end)
c = pe_change_oi.slice(start, end)

var data = [];

data1 = {
type: "column",
name: "CE Change in OI",
legendText: "CE Change in OI",
showInLegend: true,
};

data2 =	{
type: "column",
name: "PE Change in OI",
legendText: "PE Change in OI",
// axisYType: "secondary",
showInLegend: true,
};

var dataPoints = [];
for (var i = 0; i < limit; i += 1) {
dataPoints.push({
x: parseInt(a[i]),
y: parseInt(b[i])
});
}
data1.dataPoints = dataPoints;

var dataPoints = [];
for (var i = 0; i < limit; i += 1) {
dataPoints.push({
x: parseInt(a[i]),
y: parseInt(c[i])
});
}
data2.dataPoints = dataPoints;

data.push(data1)
data.push(data2)

var chart = new CanvasJS.Chart("oiChangeChartContainer", {
animationEnabled: true,
title:{
fontSize: titleFontSize,
text: "Change in Open Interest"
},
axisX: {
interval: 200
},
axisY: {
title: "OI Change",
titleFontColor: "#000",
lineColor: "#000",
labelFontColor: "#000",
tickColor: "#000"
},
axisY2: {
title: "PE OI Change",
titleFontColor: "#C0504E",
lineColor: "#C0504E",
labelFontColor: "#C0504E",
tickColor: "#C0504E"
},
toolTip: {
shared: true
},
legend: {
cursor:"pointer",
itemclick: toggleDataSeries
},
data: data
});
chart.render();


/////////////////////////////////// change in oi code closed

function toggleDataSeries(e) {
if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
e.dataSeries.visible = false;
}
else {
e.dataSeries.visible = true;
}
chart.render();
}
} //// optionBarGraph bracket end

/////////////////////////                        //////////////////////////////////
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

function display() {
if(document.getElementById('select_strike_price').checked) {
document.getElementById("table").innerHTML = "";
document.getElementById("downloadFileId").innerHTML = "";
document.getElementById("oiChartContainer").innerHTML = '';
document.getElementById("oiChangeChartContainer").innerHTML = '';

document.getElementById("created_link_text").innerHTML = "";
document.getElementById("strike_form").className = 'unhide';
document.getElementById("sheet_form").className = 'hidden';
//document.write("test");
}
else if(document.getElementById('select_option_sheet').checked) {
document.getElementById("table").innerHTML = "";
document.getElementById("oiChartContainer").innerHTML = '';
document.getElementById("oiChangeChartContainer").innerHTML = '';

document.getElementById("sheet_form").className = 'unhide';
document.getElementById("strike_form").className = 'hidden';
}
}

function hideTableOnSelectOption(){
document.getElementById("downloadFileId").innerHTML = "";
document.getElementById("table").innerHTML = "";
document.getElementById("created_link_text").innerHTML = "";
document.getElementById("oiChartContainer").innerHTML = '';
document.getElementById("oiChangeChartContainer").innerHTML = '';
}

</script>

</head>
<body class="unselectable" style="font-family: Arial, Helvetica, sans-serif;">

<form id="downloadFileForm" action="download-option-chain-data.php" method="post">
<input type="hidden" name="firstValue" value="">
<input type="hidden" name="secondValue" value="">
<input type="hidden" name="thirdValue" value="">
</form>

<?php

$all_dates = shell_exec("/var/www/html/all-dates-query-executer.sh");
$all_dates = str_replace('[', '', $all_dates);
$all_dates = str_replace(']', '', $all_dates);
$all_dates = explode(',', $all_dates);
// echo"<select">;
// foreach($all_dates as $k => $v)
// echo "<option>".str_replace('"', '', $v)."</option>";
// echo"</select">;
?>

<div class="container">
<h2>Nifty Option Data Analysis</h2>
<p>Enjoy free Nifty option data recording for all expiry with graphs and historical data.</p>

<iframe src="https://platform.twitter.com/widgets/follow_button.html?screen_name=rajatgupta207&show_screen_name=false&show_count=true&size=l" title="Follow Rajat Gupta on Twitter"
width="300" height="40" style="border: 0; overflow: hidden;" ></iframe>
<br>

<input type="radio" id="select_option_sheet" onclick="display()" name="select_data-type" checked> <label for="select_option_sheet">Option Sheet</label> &nbsp;&nbsp;&nbsp;
<input type="radio" id="select_strike_price" onclick="display()" name="select_data-type"> <label for="select_strike_price">Strike Price</label>

<form class="hidden" id="strike_form">
<div class="form-group">
<div class="form-row">
<div class="form-group col-md-3">
<label for="Strike Price">Strike Price:</label></br>
<select id="strike_price" class="form-control" name="strike_price">
<?php
for($i=7000; $i<11000; $i=$i+50)
echo "<option>".$i."</option>";
?>
</select>
</div>
<div class="form-group col-md-3">
<label for="Expiry Date">Expiry Date:</label></br>
<select id="expiry_date" class="form-control" name="expiry_date" value="9APR2020" >
<?php
$expiry_select_options_list = array("1APR2020", "9APR2020", "16APR2020", "23APR2020", "30APR2020", "7MAY2020", "14MAY2020", "21MAY2020", "28MAY2020", "4JUN2020", "11JUN2020", "18JUN2020", "25JUN2020", "2JUL2020", "9JUL2020", "30JUL2020", "27AUG2020");
$arrayLength = sizeof($expiry_select_options_list);
for($i=0; $i<$arrayLength; $i++)
echo "<option>".$expiry_select_options_list[$arrayLength - $i -1]."</option>";
?>
?>
</select>
</div>
<div class="form-group col-md-3">
<label for="Date">Date:</label></br>
<?php
echo'<select id="req_date" class="form-control" name="req_date">';
foreach($all_dates as $k => $v)
echo "<option>".str_replace('"', '', $v)."</option>";
echo"</select>";
?>
<!--<input type="text" id="req_date" class="form-control" name="req_date" value="29/04/2020" placeholder="01/04/2020" required>-->
</div>
<div class="form-group col-md-3">
<br>
<button type="button" id="strike_button" class="btn btn-primary">Get Option Data</button>
</div>
</div>
</div>
</form>

<form class="unhide" id="sheet_form">
<div class="form-group">
<div class="form-row">
<div class="form-group col-md-3">
<label for="Expiry Date">Expiry Date:</label></br>
<select id="option_expiry_date" class="form-control" name="option_expiry_date" value="9APR2020" >
<?php
$expiry_select_options_list = array("1APR2020", "9APR2020", "16APR2020", "23APR2020", "30APR2020", "7MAY2020", "14MAY2020", "21MAY2020", "28MAY2020", "4JUN2020", "11JUN2020", "18JUN2020",  "25JUN2020", "2JUL2020", "9JUL2020", "30JUL2020", "27AUG2020");
$arrayLength = sizeof($expiry_select_options_list);
for($i=0; $i<$arrayLength; $i++)
echo "<option>".$expiry_select_options_list[$arrayLength - $i -1]."</option>";
?>
</select>
</div>
<div class="form-group col-md-3">
<label for="Date">Date:</label></br>
<?php
echo'<select id="option_req_date" class="form-control" name="option_req_date">';
foreach($all_dates as $k => $v)
echo "<option>".str_replace('"', '', $v)."</option>";
echo"</select>";
?>
<!--<input type="text" id="option_req_date" class="form-control" name="option_req_date" value="01/04/2020" placeholder="01/04/2020" required>-->
</div>
<div class="form-group col-md-3">
<label for="Time">Time:</label></br>
<select class="form-control" id="option_req_time" onchange="hideTableOnSelectOption()">
<option>09:20 To 10:30</option>
<option>10:00 To 11:00</option>
<option>10:30 To 11:30</option>
<option>11:00 To 12:00</option>
<option>11:30 To 12:30</option>
<option>12:00 To 13:00</option>
<option>12:30 To 13:30</option>
<option>13:00 To 14:00</option>
<option>13:30 To 14:30</option>
<option>14:00 To 15:00</option>
<option>14:30 To 15:30</option>

</select>
</div>
<div class="form-group col-md-3">
<br>
<button type="button" id="option_button" class="btn btn-primary">Get Option Data</button>
</div>
</div>
</div>
</form>

<br><br>
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
  border-collapse:separate;
  border-spacing: 0 1em;
}
</style>

<div class="sticky"><div id="created_link_text" style="padding: 5px; background-color: white;"></div></div>
</br>

</br>

<div class="row">
<div class="col-sm-6">
<div id="oiChartContainer" style="height: 320px; width: 100%;"></div>
<hr>
</div>
<div class="col-sm-6">
<div id="oiChangeChartContainer" style="height: 320px; width: 100%;"></div>
<hr>
</div>
</div>


<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
</br>

<div style="text-align:left; font-size:17px;"><a id="downloadFileId" style="color:red; cursor: pointer; text-decoration: none;" onclick=submitDownloadFileForm()></a></div>
</br>
<table style="font-size:14px; border-color: #aca99f; border-spacing: 5px;" id="table" class="tableOption" border="1px"></table>
</div>

<br><br>

<div class="hidden" id="tempCreatedVar"></div>

<script>

function submitDownloadFileForm(){
var optionClassName = document.getElementById("sheet_form").className;
firstValue =  document.getElementById("option_expiry_date")
createdVar = document.getElementById("tempCreatedVar").innerHTML;
//document.write(createdVar);
secondValue = createdVar;
thirdValue = "";

formObject = document.getElementById("downloadFileForm");
formObject[0].value = firstValue.value;
formObject[1].value = secondValue;
formObject[2].value = thirdValue.value;
formObject.submit();
}

</script>

</body>
</html>
