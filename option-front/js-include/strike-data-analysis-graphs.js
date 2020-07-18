
function strikeBarGraph(){
var ce_oi = [];
var ce_change_oi = [];
var pe_oi = [];
var pe_change_oi = [];
var time = [];
var spot = [];
var ce_premium = [];
var pe_premium = [];
var ce_iv = [];
var pe_iv = [];



function showDefaultText(chart, text){
//document.write(chart.options.data[0].dataPoints[2].y)
var isEmpty = !(chart.options.data[0].dataPoints && chart.options.data[0].dataPoints.length > 0);
if(!chart.options.subtitles)
(chart.options.subtitles = []);
if(isEmpty)
chart.options.subtitles.push({
text : text,
fontSize: 20,
verticalAlign : 'center',
});
else
(chart.options.subtitles = []);
}

$("#table tr").each(function(){
ce_oi.push($(this).find("td:eq(4)").text());
ce_change_oi.push($(this).find("td:eq(5)").text());

time.push($(this).find("td:eq(11)").text());

pe_change_oi.push($(this).find("td:eq(19)").text());
pe_oi.push($(this).find("td:eq(20)").text());

spot.push($(this).find("td:eq(12)").text());

ce_premium.push($(this).find("td:eq(9)").text());
pe_premium.push($(this).find("td:eq(15)").text());

ce_iv.push($(this).find("td:eq(7)").text());
pe_iv.push($(this).find("td:eq(17)").text());

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
showInLegend: false,
}

data2 ={
type: "spline",
name: "OI in PE",
showInLegend: false,
}

var dataPoints = [];
for (var i = 1; i < limit; i += 1) {
//dateStr = '1970-01-01T' + a[i].slice(0, 2) + ":" + a[i].slice(2) + ":00.000+05:30";
//var dateStr = 'Thu, 01 Jan 1970 '+a[i].slice(0, 2) + ":" + a[i].slice(2)+':00 GMT+0530';
// xVal = Date.parse(dateStr);
// document.write(dateStr+"="+xVal+" ")
xVal = parseFloat(a[i]);
dataPoints.push({
x: xVal,
y: parseFloat(b[i])
});
}
data1.dataPoints = dataPoints;

var dataPoints = [];
for (var i = 0; i < limit; i += 1) {
xVal = parseFloat(a[i]);
dataPoints.push({
x: xVal,
y: parseFloat(c[i])
});
}
data2.dataPoints = dataPoints;

data.push(data1)
data.push(data2)

maxValue = -100000000
minValue = 100000000
for (i=0; i<b.length; i++){
if(parseInt(b[i]) > maxValue)
maxValue = parseInt(b[i]);
if(parseInt(c[i]) > maxValue)
maxValue = parseInt(c[i]);
if(parseInt(b[i]) != "" && parseInt(b[i]) < minValue)
minValue = parseInt(b[i]);
if(parseInt(c[i]) != "" && parseInt(c[i]) < minValue)
minValue = parseInt(c[i]);
}
var intervalValue = maxValue-minValue;

var chart = new CanvasJS.Chart("oiChartContainer", {
animationEnabled: true,
zoomEnabled: true,
title:{
fontSize: titleFontSize,
text: "Total Open Interest at Call and Put"
},
axisX: {
title: "Time"
},
axisY :{
title: "Open Interest",
minimum: minValue - parseInt(intervalValue/5),
maximum: maxValue + parseInt(intervalValue/5),
interval: parseInt(intervalValue/4)
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
showDefaultText(chart, "No Data available");
chart.render();

///////////////////////////////////// change in OI start in strike section

//a = time
//b = ce_change_oi
//c = pe_change_oi
//
//var limit = a.length;
//var data = [];
//
//data1 ={
//type: "spline",
//name: "OI Change in CE",
//showInLegend: false,
//}
//
//data2 ={
//type: "spline",
//name: "OI Change in PE",
//showInLegend: false,
//}
//
//var dataPoints = [];
//for (var i = 1; i < limit; i += 1) {
////dateStr = '1970-01-01T' + a[i].slice(0, 2) + ":" + a[i].slice(2) + ":00.000+05:30";
////var dateStr = 'Thu, 01 Jan 1970 '+a[i].slice(0, 2) + ":" + a[i].slice(2)+':00 GMT+0530';
//// xVal = Date.parse(dateStr);
//// document.write(dateStr+"="+xVal+" ")
//xVal = parseFloat(a[i]);
//dataPoints.push({
//x: xVal,
//y: parseFloat(b[i])
//});
//}
//data1.dataPoints = dataPoints;
//
//var dataPoints = [];
//for (var i = 0; i < limit; i += 1) {
//xVal = parseFloat(a[i]);
//dataPoints.push({
//x: xVal,
//y: parseFloat(c[i])
//});
//}
//data2.dataPoints = dataPoints;
//
//data.push(data1)
//data.push(data2)
//
//var chart = new CanvasJS.Chart("oiChangeChartContainer", {
//animationEnabled: true,
//zoomEnabled: true,
//title:{
//fontSize: titleFontSize,
//text: "OI Change with Time"
//},
//axisX: {
//title: "Time"
//},
//axisY :{
//title: "OI Change"
////includeZero:false
//},
//toolTip: {
//shared: true
//},
//legend:{
//cursor:"pointer",
//itemclick: toggleDataSeries
//},
//data: data
//});
//showDefaultText(chart, "No Data available");
chart.render();

/////////////////////////////////////////////// change in oi in strike section closed

///////////////////////////////////// spot price section

a = time
b = spot

var limit = a.length;
var data = [];

dataVal ={
type: "line",
name: "Nifty Index",
lineColor: "black",
showInLegend: false,
}

var dataPoints = [];
for (var i = 1; i < limit; i += 1) {
xVal = parseFloat(a[i]);
dataPoints.push({
x: xVal,
y: parseFloat(b[i])
});
}
dataVal.dataPoints = dataPoints;

data.push(dataVal)


maxValue = -100000000
minValue = 100000000
for (i=0; i<b.length; i++){
if(parseInt(b[i]) > maxValue)
maxValue = parseInt(b[i]);
if(parseInt(b[i]) != "" && parseInt(b[i]) < minValue)
minValue = parseInt(b[i]);
}
var intervalValue = maxValue-minValue;

var chart = new CanvasJS.Chart("spotChartContainer", {
animationEnabled: true,
zoomEnabled: true,
title:{
fontSize: titleFontSize,
text: "Nifty Index"
},
axisX: {
title: "Time"
},
axisY :{
title: "Nifty Index",
minimum: minValue - parseInt(intervalValue/5),
maximum: maxValue + parseInt(intervalValue/5),
interval: parseInt(intervalValue/4)
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
showDefaultText(chart, "No Data available");
chart.render();

/////////////////////////////////////////////// spot price section closed

///////////////////////////////////// Call LTP section

a = time
b = ce_premium

var limit = a.length;
var data = [];

dataVal ={
type: "line",
name: "LTP at Call",
showInLegend: false,
}

var dataPoints = [];
for (var i = 1; i < limit; i += 1) {
xVal = parseFloat(a[i]);
dataPoints.push({
x: xVal,
y: parseFloat(b[i])
});
}
dataVal.dataPoints = dataPoints;

data.push(dataVal)



maxValue = -100000000
minValue = 100000000
for (i=0; i<b.length; i++){
if(parseFloat(b[i]) > maxValue)
maxValue = parseFloat(b[i]);

if(parseFloat(b[i]) != "" && parseFloat(b[i]) < minValue)
minValue = parseFloat(b[i]);
}

var intervalValue = maxValue-minValue;

var chart = new CanvasJS.Chart("callPremiumChartContainer", {
animationEnabled: true,
zoomEnabled: true,
title:{
fontSize: titleFontSize,
text: "LTP at Call"
},
axisX: {
title: "Time"
},
axisY :{
title: "LTP at Call",
minimum: minValue - parseInt(intervalValue/5),
maximum: maxValue + parseInt(intervalValue/5),
interval: parseInt(intervalValue/4)
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
showDefaultText(chart, "No Data available");
chart.render();

/////////////////////////////////////////////// call LTP section closed

///////////////////////////////////// call oi change section

a = time;
b = ce_change_oi;

var limit = a.length;
var data = [];

dataVal ={
type: "line",
name: "OI Change at Call",
showInLegend: false,
}

var dataPoints = [];
for (var i = 1; i < limit; i += 1) {
xVal = parseFloat(a[i]);
dataPoints.push({
x: xVal,
y: parseFloat(b[i])
});
}
dataVal.dataPoints = dataPoints;

data.push(dataVal)



maxValue = -100000000
minValue = 100000000
for (i=0; i<b.length; i++){
if(parseFloat(b[i]) > maxValue)
maxValue = parseFloat(b[i]);
if(parseFloat(b[i]) != "" && parseFloat(b[i]) < minValue)
minValue = parseFloat(b[i]);
}
var intervalValue = maxValue-minValue;

var chart = new CanvasJS.Chart("callOIChangeChartContainer", {
animationEnabled: true,
zoomEnabled: true,
title:{
fontSize: titleFontSize,
text: "OI Change at Call"
},
axisX: {
title: "Time"
},
axisY :{
title: "OI Change",
minimum: minValue - parseInt(intervalValue/5),
maximum: maxValue + parseInt(intervalValue/5),
interval: parseInt(intervalValue/4)
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
showDefaultText(chart, "No Data available");
chart.render();

/////////////////////////////////////////////// call oi change section closed

///////////////////////////////////// call iv section

a = time;
b = ce_iv;

var limit = a.length;
var data = [];

dataVal ={
type: "line",
name: "IV Change at Call",
showInLegend: false,
}

var dataPoints = [];
for (var i = 1; i < limit; i += 1) {
xVal = parseFloat(a[i]);
dataPoints.push({
x: xVal,
y: parseFloat(b[i])
});
}
dataVal.dataPoints = dataPoints;

data.push(dataVal)


maxValue = -100000000
minValue = 100000000
for (i=0; i<b.length; i++){
if(parseFloat(b[i]) > maxValue)
maxValue = parseFloat(b[i]);

if(parseFloat(b[i]) != "" && parseFloat(b[i]) < minValue)
minValue = parseFloat(b[i]);
}
var intervalValue = maxValue-minValue;

var chart = new CanvasJS.Chart("callIVChartContainer", {
animationEnabled: true,
zoomEnabled: true,
title:{
fontSize: titleFontSize,
text: "IV Change at Call"
},
axisX: {
title: "Time"
},
axisY :{
title: "CAll IV",
minimum: minValue - parseInt(intervalValue/5),
maximum: maxValue + parseInt(intervalValue/5),
interval: parseInt(intervalValue/4)
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
showDefaultText(chart, "No Data available");
chart.render();


/////////////////////////////////////////////// call IV section closed



///////////// &&&&&&&&&&&&&&&&&&&&&&&&&&&&& PUT &&&&&&&&&&&&&&&&&&&&&&&&&&&&&& ////////////////////


///////////////////////////////////// Call LTP section

a = time
b = pe_premium

var limit = a.length;
var data = [];

dataVal ={
type: "line",
name: "LTP at Put",
lineColor: "#c14343",
legendMarkerColor: "#c14343",
showInLegend: false,
}

var dataPoints = [];
for (var i = 1; i < limit; i += 1) {
xVal = parseFloat(a[i]);
dataPoints.push({
x: xVal,
y: parseFloat(b[i])
});
}
dataVal.dataPoints = dataPoints;

data.push(dataVal)



maxValue = -100000000
minValue = 100000000
for (i=0; i<b.length; i++){
if(parseFloat(b[i]) > maxValue)
maxValue = parseFloat(b[i]);

if(parseFloat(b[i]) != "" && parseFloat(b[i]) < minValue)
minValue = parseFloat(b[i]);
}

var intervalValue = maxValue-minValue;

var chart = new CanvasJS.Chart("putPremiumChartContainer", {
animationEnabled: true,
zoomEnabled: true,
title:{
fontSize: titleFontSize,
text: "LTP at Put"
},
axisX: {
title: "Time"
},
axisY :{
title: "LTP at Put",
minimum: minValue - parseInt(intervalValue/5),
maximum: maxValue + parseInt(intervalValue/5),
interval: parseInt(intervalValue/4)
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
showDefaultText(chart, "No Data available");
chart.render();

/////////////////////////////////////////////// Put LTP section closed

///////////////////////////////////// Put oi change section

a = time;
b = pe_change_oi;

var limit = a.length;
var data = [];

dataVal ={
type: "line",
name: "OI Change at Put",
lineColor: "#c14343",
legendMarkerColor: "#c14343",
showInLegend: false,
}

var dataPoints = [];
for (var i = 1; i < limit; i += 1) {
xVal = parseFloat(a[i]);
dataPoints.push({
x: xVal,
y: parseFloat(b[i])
});
}
dataVal.dataPoints = dataPoints;

data.push(dataVal)



maxValue = -100000000
minValue = 100000000
for (i=0; i<b.length; i++){
if(parseFloat(b[i]) > maxValue)
maxValue = parseFloat(b[i]);
if(parseFloat(b[i]) != "" && parseFloat(b[i]) < minValue)
minValue = parseFloat(b[i]);
}
var intervalValue = maxValue-minValue;

var chart = new CanvasJS.Chart("putOIChangeChartContainer", {
animationEnabled: true,
zoomEnabled: true,
title:{
fontSize: titleFontSize,
text: "OI Change at Put"
},
axisX: {
title: "Time"
},
axisY :{
title: "OI Change",
minimum: minValue - parseInt(intervalValue/5),
maximum: maxValue + parseInt(intervalValue/5),
interval: parseInt(intervalValue/4)
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
showDefaultText(chart, "No Data available");
chart.render();

/////////////////////////////////////////////// Put oi change section closed

///////////////////////////////////// Put iv section

a = time;
b = pe_iv;

var limit = a.length;
var data = [];

dataVal ={
type: "line",
name: "IV Change at Put",
lineColor: "#c14343",
legendMarkerColor: "#c14343",
showInLegend: false,
}

var dataPoints = [];
for (var i = 1; i < limit; i += 1) {
xVal = parseFloat(a[i]);
dataPoints.push({
x: xVal,
y: parseFloat(b[i])
});
}
dataVal.dataPoints = dataPoints;

data.push(dataVal)


maxValue = -100000000
minValue = 100000000
for (i=0; i<b.length; i++){
if(parseFloat(b[i]) > maxValue)
maxValue = parseFloat(b[i]);

if(parseFloat(b[i]) != "" && parseFloat(b[i]) < minValue)
minValue = parseFloat(b[i]);
}
var intervalValue = maxValue-minValue;

var chart = new CanvasJS.Chart("putIVChartContainer", {
animationEnabled: true,
zoomEnabled: true,
title:{
fontSize: titleFontSize,
text: "IV Change at Put"
},
axisX: {
title: "Time"
},
axisY :{
title: "Put IV",
minimum: minValue - parseInt(intervalValue/5),
maximum: maxValue + parseInt(intervalValue/5),
interval: parseInt(intervalValue/5)
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
showDefaultText(chart, "No Data available");
chart.render();

/////////////////////////////////////////////// put IV section closed



function toggleDataSeries(e) {
	if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	}
	else {
		e.dataSeries.visible = true;
	}
	showDefaultText(chart, "No Data available");
chart.render();
}
}
