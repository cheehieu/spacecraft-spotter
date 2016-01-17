#!/bin/bash

TIME=500
USER_LATITUDE=34.4258
USER_LONGITUDE=-119.7142

read X_OFFSET Y_OFFSET SCALE ROTATE <<< $(python parse.py ${TIME} $USER_LATITUDE $USER_LONGITUDE)

convert TRV.png -scale $SCALE% scaledTRV.png
convert -background 'rgba(0,0,0,0)' -rotate $ROTATE scaledTRV.png rotateTRV.png
composite -geometry +$X_OFFSET+$Y_OFFSET rotateTRV.png sky.png output.png
