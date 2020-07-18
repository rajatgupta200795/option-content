query='select DISTINCT raw SUBSTR(TOSTRING(created), 6, 2) || "/" || SUBSTR(TOSTRING(created), 4, 2) || "/" || SUBSTR(TOSTRING(created), 0, 4) from market where strike_price = "10000" order by created DESC'
/opt/couchbase/bin/cbq --script="$query" --engine=http://localhost:8091 -u Administrator -p rajat123 |  tail -n +6 > resultAllDate.json;

x=$(jq '.results ' resultAllDate.json);

echo $x;

rm resultAllDate.json;
