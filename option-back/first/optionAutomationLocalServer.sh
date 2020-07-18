#!/bin/bash

currentTime=$(date +"%H")$(date +"%M")

marketStart=920
marketClose=2303

#########################################

if [[ "$currentTime" -lt $marketStart ]]; then 
echo "No new option data is available. Please Start after 09:20";  
fi

#########################################

if [ "$currentTime" -gt $marketStart ] && [ "$currentTime" -lt $marketClose ]; then 
echo "New option data found."; 

while true
do

currentTime=$(date +"%H")$(date +"%M")

echo "Getting option data ...";
python3 FetchOptionData.py
echo "Option data is fetched";

echo "Inserting data..."

./DbInsert.sh

m=10#$(date +"%M");
s=10#$(date +"%S");


rmin=$(( 3 - $(( m % 3 )) ))
rsec=$(( 60 - s ))


if [ "$rmin" -eq 1 ]; then
totalSec=$rsec
echo $totalSec
fi


if [ "$rmin" -eq 2 ]; then
totalSec=$(( 60 + $rsec ))
echo $totalSec
fi


if [ "$rmin" -eq 3 ]; then
totalSec=$(( 120 + $rsec )) 
echo $totalSec
fi

if [ $currentTime -eq $marketClose ] || [ $currentTime -gt $marketClose ]; then
break
fi

sleep $(( $totalSec + 10 ))

done

fi

############################################

if  [ $currentTime -eq $marketClose ] || [ $currentTime -gt $marketClose ]; then  
echo "market is closed."; 
fi
