expiry=$1
created=$2
tag=$3

if [ -z "$expiry" ]
then
echo "Input missing";
exit;
fi

if [ -z "$created" ]
then
echo "Input data is missing";
exit;
fi

sudo chown $USER resultData.json
query='select SUBSTR(TOSTRING(created), 8) as time, ce_chng_in_oi, pe_chng_in_oi, ce_iv, pe_iv, ce_ltp, pe_ltp, ce_net_chng, pe_net_chng, ce_oi, pe_oi, ce_volume, pe_volume, strike_price, spot_price from market where meta().id like "'$expiry'%" and created = '"$created"'  order by TONUMBER(strike_price)'
/opt/couchbase/bin/cbq --script="$query" --engine=http://localhost:8091 -u Administrator -p rajat123  |  tail -n +6 > resultData.json;
x=$(jq '.results ' resultData.json);

echo $x > $tag".json";
#echo $x > resultData.json;
#
#created=$(echo $created | cut -c1-8);
#python3 greeks-adder.py $expiry $created;

python3 jsonToCsv.py $tag
mv $tag".csv" csvFiles/
rm $tag".json"

