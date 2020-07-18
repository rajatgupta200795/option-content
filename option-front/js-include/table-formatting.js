function tableFormatting(){
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

}