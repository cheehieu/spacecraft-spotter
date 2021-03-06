# spacecraft-spotter

This project was completed for HackRice 2016 by [Rohit Rawat] (http://devpost.com/PolloLoco) and [Hieu Nguyen](http://devpost.com/hieu).

<img src="http://niftyhedgehog.com/spacecraft-spotter/images/TRV_display.jpg">

## Inspiration
This project was inspired by Intuitive Machine's Terrestrial Return Vehicle (TRV) TRaVeller spacecraft, and the suggested project statement to "let a user know if TRV is visible from their current location." The [TRV](https://intuitivemachines.com/Aerospace/SpaceSystems/) is an automated precision return vehicle, designed to deliver a scientific payload to a Low Earth Orbit (and beyond) and autonomously re-enter the Earth's atmosphere for a safe, precision landing. The initial idea was to create an Android application based on the open source Google Sky Map project, allowing users to explore the current location of the TRV on their mobile devices -- an augmented reality window of the night sky.

<img src="http://niftyhedgehog.com/spacecraft-spotter/images/TRV.png" width="400">

We also sat in the Google Cloud Platform workshop at HackRice and learned how to use Firebase to build real-time web applications, which was incorporated into the project's cloud infrastructure.


## What it does
Spacecraft-Spotter is a web application that utilizes real telemetry data from the TRV to map its position in a simulated sky, allowing users to locate the vehicle in their own sky overhead as it makes its way home from the International Space Station. It was built to help people learn more about the TRV spacecraft and to interactively follow its mission in an engaging manner.


## How we built it
The web app runs on a virtual server on the Google Cloud Platform. The frontend web interface was built with HTML, Bootstrap, Javascript, jQuery, and Underscore.js. Backend cloud services were provided by Firebase, which hosted the static site and its data content. Geolocation API's from Google Maps and freegeoip were used to determine a user's location based on their IP address. Alternatively, the user can specify a different city or custom latitude/longitude. With this information, Stellarium (a planetarium software) can generate a simulated view of the sky from that location, showing exactly what you would see when you look up at the stars. This 180-degree FOV view was then exported to a PNG image.

<img src="http://niftyhedgehog.com/spacecraft-spotter/images/webapp_location.png">

Intuitive Machines provided a CSV file of simulated telemetry data of a TRV landing from the ISS to Vandenberg Air Force Base in California. This CSV file contained over 200,000 data entries for various TRV characteristics including mission time, sensor states, propellant and engine statuses, velocity/acceleration, attitude quaternions, and more. A Python script utilized NumPy data structures to parse and manipulate the CSV data to determine the TRV's latitude, longitude, altitude, and flight path angle. 

<img src="http://niftyhedgehog.com/spacecraft-spotter/images/telemetry_data.png">

A calculated transformation was done to map the spacecraft's lat/long coordinates into the user's sky perspective at a discrete timestep. A further transformation was done with ImageMagick to overlay an image of the TRV onto the Stellarium image, incorporating the spacecraft's position in the sky, flight path angle, and altitude. The TRV image rotates over time corresponding to the flight path, and the closer it gets to landing, the bigger it appears on the sky map.

<img src="http://niftyhedgehog.com/spacecraft-spotter/images/output.png">

The output overlay image is then displayed back on the web interface. An extra feature was added to "animate" the flight by generating overlayed images at discrete timesteps and displaying them in sequential order.

<img src="http://niftyhedgehog.com/spacecraft-spotter/images/webapp.png">


## Challenges we ran into
We ran into several challenges throughout this project. As a demo, the web application was functional, but not optimized for performance. The largest bottleneck on latency was due to having to run the Stellarium software locally on the server. We could not find a good, open web API to generate an image of the sky based on the user's location. So, we had to settle with an offline solution of Stellarium.

It also took some time to fully interpret the telemetry data in the CSV file. Parsing the information is one task, but manipulating the data to ensure proper unit conversions and coordinate system transformations proved to be non-trivial. A less-than-ideal workaround was used to position the spacecraft into the sky image; it may not be 100% accurate, but it's good enough to display a landing pattern that can deceive the untrained eye.


## Accomplishments that we're proud of
HackRice 2016 was both of our first hackathons, so we're proud to have gone through the experience (and to actually submit a project). We were fairly late in the game when we settled on this idea, so it was very rewarding to collaborate and see the project come alive. We were just a team of two this time around, but just imagine what we could do with a team of three!

This was also Rohit's first Node.js application!


## What we learned
A lot! Both of us worked with new technologies and API's that we were previously unfamiliar with. We learned about Firebase and the Google Cloud Platform that same day from a locally-hosted seminar. We also learned about autonomous spacecraft landings, astronomy, celestial coordinates, and how MLH works.


## What's next for spacecraft-spotter
There are so many more features that we could add to improve the functionality and performance of this project. Although it was fun to build, it is unlikely that we will revisit it. We live in different cities, and Rohit is finishing up his last semester of school!


## Misc.
Hieu met Rohit at a shuttle stop in the visitors parking lot at Rice University in Houston, TX. They had both driven several hours from other cities (Hieu from Austin, Rohit from Arlington), and arrived on campus around 7pm to attend HackRice 2016. Both were completely lost, but managed to find their way to the hackathon with the help of three friendly Rice students. There, they shared a table together, discussing potential project ideas. Intuitive Machines was one of the hackathon's sponsors offering a special prize for working with their data set. With no other exciting prospective projects in mind, we went to work.


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


## Fin.
=======
