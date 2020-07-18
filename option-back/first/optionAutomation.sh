#!/bin/bash
while  true
do

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
totalSec=$((  120 + $rsec )) 
echo $totalSec
fi



python3 FetchOptionData.py
sleep 5
./DbInsert.sh 

sleep $(( $totalSec + 10 ))

done
