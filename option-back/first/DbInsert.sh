
option_expiry_json_data(){

i=0
while IFS=',' read -r f1 f2 f3 f4 f5 f6 f7 f8 f9 f10 f11 f12 f13 f14 f15 f16 f17 f18 f19 f20 f21 f22
do

  if [ $i == 0 ]
  then
    i=1
    continue
  fi

  data="{\"created\" : $created, \"ce_oi\" : \"$f2\", \"ce_chng_in_oi\" : \"$f3\", \"ce_volume\" : \"$f4\", \"ce_iv\" : \"$f5\", \"ce_ltp\" : \"$f6\", \"ce_net_chng\" : \"$f7\", \"strike_price\" : \"${f12%.*}\", \"pe_net_chng\" : \"$f17\", \"pe_ltp\" : \"$f18\", \"pe_iv\" : \"$f19\", \"pe_volume\" : \"$f20\", \"pe_chng_in_oi\" : \"$f21\", \"pe_oi\" : \"$f22\", \"spot_price\" : \"$nifty_index\"}"  #data=$(echo $data | jq '.')
  strike_price_text=":${f12%.*}:"
  doc_id=$(echo $(echo $x | cut -d "." -f 1) | cut -d "_" -f -3) #remove .csv
  doc_id=$(sed "s/_/$strike_price_text/2" <<< "$doc_id")
  #echo $doc_id
  /opt/couchbase/bin/cbq --script="INSERT INTO market (KEY, VALUE) VALUES ('$doc_id', $data)" --engine=http://localhost:8091 -u Administrator -p rajat123
done < "$option_file_name"
}


while IFS= read -r expiry_date; do
  option_file_name=$(ls | grep $expiry_date)
  nifty_index=$(echo $(echo $option_file_name | cut -d "_" -f 4) | cut -d "." -f -1)
  #option_file_name=$(echo $file_name | cut -d "_" -f -3 )".csv"
  x=$option_file_name
  #option_file_name=$(echo $(echo $x | cut -d "." -f 1) | cut -d ":" -f -4)
  created=$(sed "s/://g" <<< $(sed "s/_//g" <<< $(echo $(echo $(echo $x | cut -d "." -f 1) | cut -d "_" -f 2-) | cut -d "_" -f -2)))
  #echo $created
  option_expiry_json_data $option_file_name $created $nifty_index
done < "Running_Expiry_Date.txt"
