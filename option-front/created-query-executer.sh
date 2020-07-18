expiry=$1
created1=$2
created2=$3

if [ -z "$expiry" ]
then
echo "Input missing";
exit;
fi

if [ -z "$created1" ]
then
echo "Two input data is missing";
exit;
fi

query='select DISTINCT RAW created  from market where meta().id like "'$expiry'%" and (created between '$created1' and '$created2') order by created'
/opt/couchbase/bin/cbq --script="$query" --engine=http://localhost:8091 -u Administrator -p rajat123  |  tail -n +6 > resultData.json;
x=$(jq '.results ' resultData.json);
rm resultData.json;
#echo $x > $tag".json";
echo $x;
#python3 jsonToCsv.py $tag
#mv $tag".csv" csvFiles/
#rm $tag".json"
