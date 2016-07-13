#!/bin/sh

rm globus.js
cat ./modules/globus-headers.js >> globus.js  

string=`find ./modules -type f -not -name "*header*"`

oldIFS="$IFS"
IFS='
'
lines=( $string )
IFS="$oldIFS"

for line in "${lines[@]}"
do
		cat "$line" >> globus.js
done