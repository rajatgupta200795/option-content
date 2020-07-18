strike=$1
expiry=$2
tag=$3
req_date=$4

if [ -z "$strike" ]
then
echo "Input missing";
exit;
fi

if [ -z "$expiry" ]
then
echo "Two input data is missing";
exit;
fi

#query='select SUBSTR(TOSTRING(created), 8) as time , ce_askprice, pe_askprice, ce_bidprice, pe_bidprice, ce_bidqty, pe_bidqty, ce_chng_in_oi, ce_askqty, pe_askqty, pe_chng_in_oi, ce_iv, pe_iv, ce_ltp, pe_ltp, ce_net_chng, pe_net_chng, ce_oi, pe_oi, ce_volume, pe_volume, strike_price, spot_price from market where strike_price="'$strike'" and TOSTRING(created) like "'$req_date'%" and meta().id like "'$expiry'%"  order by created'
query='select SUBSTR(TOSTRING(created), 8) as time,  ce_chng_in_oi, pe_chng_in_oi, ce_iv, pe_iv, ce_ltp, pe_ltp, ce_net_chng, pe_net_chng, ce_oi, pe_oi, ce_volume, pe_volume, strike_price, spot_price from market where strike_price="'$strike'" and TOSTRING(created) like "'$req_date'%" and meta().id like "'$expiry'%"  order by created'
/opt/couchbase/bin/cbq --script="$query" --engine=http://localhost:8091 -u Administrator -p rajat123 |  tail -n +6 > resultData.json;
x=$(jq '.results ' resultData.json);
#echo $x > $tag".json";

echo $x > resultData.json;
python3 greeks-adder.py $expiry $req_date
#echo $x;


#python3 jsonToCsv.py $tag
#mv $tag".csv" csvFiles/
#rm $tag".json"
