<?php

echo'
<div class="form-group">
<div class="form-row">
<div class="form-group col-md-3">
<label for="Strike Price">Strike Price:</label></br>
<select id="strike_price" class="form-control" name="strike_price">
';

for($i=9000; $i<11000; $i=$i+50)
echo "<option>".$i."</option>";

echo '
</select>
</div>
<div class="form-group col-md-3">
<label for="Expiry Date">Expiry Date:</label></br>
<select id="expiry_date" class="form-control" name="expiry_date" value="9APR2020" >
';

$expiry_select_options_list = array("1APR2020", "9APR2020", "16APR2020", "23APR2020", "30APR2020", "7MAY2020", "14MAY2020", "21MAY2020", "28MAY2020", "4JUN2020", "11JUN2020", "25JUN2020", "30JUL2020");
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


echo'
</div>
<div class="form-group col-md-3">
<br>
<button type="button" id="strike_button" class="btn btn-primary">Get Option Data</button>
</div>
</div>
</div>
';

?>
