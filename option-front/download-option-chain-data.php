<html>
<head>
<title>Download Option Chain Data Recording</title>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css">
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

</head>
<body>

<div class="container">

<div style="font-size:20px; text-align: center; line-height: 3;">

<h1>Download Option Chain Data Recording</h1>
<div id="creatingFile">We are creating your csv file. Please wait...</div>
<div id="downloadFile" class="hidden">Your file is ready to download
</br>
<a class="btn btn-success btn-lg" id="downloadFileLink"> Download CSV File</a>
</div>
<a href="index.php">Go back</a>
</br>
</br>
</br>

<!--For share market updates, follow us on Twitter
</br>
<iframe src="https://platform.twitter.com/widgets/follow_button.html?screen_name=rajatgupta207&show_screen_name=true&show_count=true&size=l" title="Follow Rajat Gupta on Twitter"
width="300" height="40" style="border: 0; overflow: hidden;" ></iframe>
-->
</div>

</div>

<script>
setTimeout(
function() {
document.getElementById("creatingFile").className = "hidden";
document.getElementById("downloadFile").className = "unhide";
}, 15000);

<?php
$firstValue = @$_POST['firstValue'];
$secondValue = @$_POST['secondValue'];
echo'
var expiry_date = "'.$firstValue.'";
var created = "'.$secondValue.'";
';
?>

var d = new Date();
var tag = expiry_date+"-"+created+"-"+d.getTime();
// document.write("get-requested-download-option-data.php?expiry_date="+expiry_date+"&tag="+tag+"&created="+created);
document.getElementById("downloadFileLink").href = "csvFiles/"+tag+".csv";
$.get("get-requested-download-option-data.php?expiry_date="+expiry_date+"&tag="+tag+"&created="+created);

</script>


</body>
