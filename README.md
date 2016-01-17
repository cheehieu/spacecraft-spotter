# spacecraft-spotter

This project was completed for HackRice 2016 by [Rohit Rawat] (http://devpost.com/PolloLoco) and [Hieu Nguyen](http://devpost.com/hieu).

* Elevator pitch
* Try in out
* Image gallery


## Inspiration
This project was inspired by Intuitive Machine's Terrestrial Return Vehicle (TRV) TRaVeller spacecraft, and the suggested project statement to "let a user know if TRV is visible from their current location." The [TRV](https://intuitivemachines.com/Aerospace/SpaceSystems/) is an automated precision return vehicle, designed to deliver a scientific payload to a Low Earth Orbit (and beyond) and autonomously re-enter the Earth's atmosphere for a safe, precision landing.


## What it does

## How we built it

## Challenges we ran into

## Accomplishments that we're proud of

## What we learned

## What's next for spacecraft-spotter

## Setup and Deployment

### Tools needed
- NodeJS and npm
- Stellarium

### Deployment Instructions
- Create your own Google Maps Geolocation API key. Remove contents of API_KEY.TXT and paste your Google Maps Geolocation API key there. 
- Launch the server process on the server machine:
export GEO_API_KEY=$(cat API_KEY.TXT); nodejs server.js
- Open a web browser on any machine that can access the server and open the URL:
http://server-ip:8080

