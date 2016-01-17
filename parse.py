#!/usr/bin/python

import sys
from subprocess import call
import numpy as np
from math import *
from numpy import genfromtxt

# Parse relevant data from CSV file into ndarrays (3986 logs)
data = genfromtxt('trv_entry_comb_data_final_uniq.csv', dtype=None, delimiter=',')
col_headings = data[0][:]
# GMT_time = data[1:, np.where(col_headings == "GMT_timestamp")[0][0]]
# MET_time = data[1:, np.where(col_headings == " AFM_MET_time")[0][0]]
# up_time = data[1:, np.where(col_headings == " AFM_upp_time")[0][0]]
long_rad = data[1:, np.where(col_headings == " UPP_ecef_longitude")[0][0]]
lat_rad = data[1:, np.where(col_headings == " UPP_ecef_gd_latitude")[0][0]]
altitude = data[1:, np.where(col_headings == " UPP_ecef_gd_altitude")[0][0]]
path_angle_rad = data[1:, np.where(col_headings == " UPP_esef_flight_path_angle")[0][0]]
latitude = np.rad2deg(lat_rad.astype(float))
longitude = np.rad2deg(long_rad.astype(float))
altitude = altitude.astype(float)
path_angle = np.rad2deg(path_angle_rad.astype(float))

if (len(sys.argv) > 1):
	# Return all lat/long
	if (sys.argv[1] == 'all'):
		for i in range(len(latitude)):
			print latitude[i], longitude[i] #, altitude[i]
		sys.exit()

	# Return lat/long at specific index
	idx = int(sys.argv[1])
	if (len(sys.argv) == 2):
		print latitude[idx], longitude[idx] #, altitude[idx]

	# Return deltas from user's lat/long (python parse.py idx lat long)
	if (len(sys.argv) > 2):
		d_lat = latitude[idx] - float(sys.argv[2])
		d_long = longitude[idx] - float(sys.argv[3])

		# Take in user's lat/long, return XY location, rotation for image superimpose
		RADIUS = 384
		CENTER = [679, 379]

		# Add X offset for longitude
		long_ratio = d_long / 180
		x_TRV = CENTER[0] - long_ratio*RADIUS

		# Add Y offset for latitude
		lat_ratio = d_lat / 180
		y_TRV = CENTER[1] - lat_ratio*RADIUS

		# Calculate altitude ratio to scale image (bigger = closer)
		# 400000m at ISS, 0m at landing
		ALT_SCALE_CONST = 180000
		alt_percent = int( (1 - altitude[idx] / ALT_SCALE_CONST) * 50)

		# Get path angle for rotation
		ADJ_ANGLE = -45 #45
		rotation = path_angle[idx] + ADJ_ANGLE

		# Return lat/long, scale%, rotation
		print int(x_TRV), int(y_TRV), alt_percent, rotation

		# Offset for TRV image center


'''
test_lat = 10 * (pi/180)
test_long = 20 * (pi/180)

# Transform lat/long coords to J2000 coords
eps = 23.44 * (pi/180)
right_ascension = 180/pi * atan( (sin(test_long)*cos(eps) - tan(test_lat)*sin(eps)) / cos(test_long) )
declination = 180/pi * asin( sin(test_lat)*cos(eps) + cos(test_lat)*sin(test_long) )
'''
