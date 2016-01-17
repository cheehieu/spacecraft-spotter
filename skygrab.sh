#!/bin/bash

if [ $# -lt 2 ]
then
  echo "Usage:"
  echo "$0 latitude logitude [name]"
  echo "Example: $0 29.716635 -95.401809 \"Houston, TX\""
  exit
fi

LAT=$1
LON=$2
NAME=$3
TIME=$4
redrawBackground=$5

if [ $# -lt 4 ]
then
  TIME=300
fi

if [ $# -lt 5 ]
then
  redrawBackground=1
fi

# stellarium --longitude 77.2090 --latitude 28.6139 --fov 180 &
#echo stellarium --longitude $LON --latitude $LAT --fov 180 &
#stellarium --longitude $LON --latitude $LAT --fov 180 &

if [ $redrawBackground -gt 0 ]
	then
	echo "REDRAWING!"
	sed -e "s/LATITUDE/$LAT/g" in.ssc | sed -e "s/LONGITUDE/$LON/g" | sed -e "s/NAME/$NAME/g" > out.ssc
	cat out.ssc
	echo "$LAT $LON $NAME" >> logfile.txt
	stellarium --startup-script $PWD/out.ssc &> /dev/null &
	#stellarium --longitude $LON --latitude $LAT --fov 180 &> /dev/null &
	sleep 2;
	gnome-screenshot -f sky.png
	pkill stellarium

	cp sky.png sky_orig.png
else
	echo "NOT DRAWING"
	cp sky_orig.png sky.png
fi

#TIME=500
USER_LATITUDE=$LAT
USER_LONGITUDE=$LON

// Call python script which calculates ship position
read X_OFFSET Y_OFFSET SCALE ROTATE <<< $(python parse.py ${TIME} $USER_LATITUDE $USER_LONGITUDE)

// Image-magic!
convert TRV.png -scale $SCALE% scaledTRV.png
convert -background 'rgba(0,0,0,0)' -rotate $ROTATE scaledTRV.png rotateTRV.png
composite -geometry +$X_OFFSET+$Y_OFFSET rotateTRV.png sky.png sky.png
