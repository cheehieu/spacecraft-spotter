// This is the main entry point to the Spaceship Spotter server app

// For invoking Stellarium and Python scripts
var sys = require('sys')
var exec = require('child_process').exec;

// Web server
var express = require('express')
var bodyParser = require("body-parser");
var app = express();

// Google Maps Geocode API URL
var googleMapsHost = "maps.googleapis.com"
var querystring = require('querystring');
var URL = "/maps/api/geocode/json?"

// Please export your Google Maps Geolocation cloud API key in GEO_API_KEY
var API_KEY = process.env.GEO_API_KEY;

var https = require('https');

// to serve static data
app.use(express.static(__dirname + '/static'))
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080
server = app.listen(port, function() {
    console.log('Server listening at http://%s:%s',
        server.address().address, server.address().port)
})


// Returns the most recently generated image
app.get('/sky.png', function(req, res) {
    res.sendFile('sky.png', {
        root: __dirname
    })
})

// Post handler
app.post('/execute', function(req, res0) {

    // console.log(JSON.stringify(req.body));
    // console.log('req.body.placeName', req.body['placeName']);
    // console.log('req.body.latitude', req.body['latitude']);
    // console.log('req.body.longitude', req.body['longitude']);
    // console.log('req.body.autoPlaceName', req.body['autoPlaceName']);

    // extract POST arguments
    var betterCity = req.body['placeName'];
    var newLatitude = req.body['latitude'];
    var newLongitude = req.body['longitude'];
    var time = req.body['time'];
    var redrawBackground = req.body['redrawBackground'];

    // if location lookup was requested
    if (req.body['doLookup'] == "true") {
        console.log("Looking up the city..")
        var query = URL + querystring.stringify({
            address: req.body['placeName']
        }) + "&key=" + API_KEY;
        // console.log(query)
        var options = {
            host: googleMapsHost,
            path: query
        };

        var req = https.get(options, function(res1) {
            // console.log('STATUS: ' + res1.statusCode);
            // console.log('HEADERS: ' + JSON.stringify(res1.headers));

            // Buffer the body entirely for processing as a whole.
            var bodyChunks = [];
            res1.on('data', function(chunk) {
                // You can process streamed parts here...
                bodyChunks.push(chunk);
            }).on('end', function() {
                var body = Buffer.concat(bodyChunks);
                // console.log('BODY: ' + body);
                // ...and/or process the entire body here.
                var response = JSON.parse(body);
                betterCity = response.results[0].formatted_address;
                newLatitude = response.results[0].geometry.location.lat;
                newLongitude = response.results[0].geometry.location.lng;
                console.log("Updating to " + betterCity + ", Lat: " + newLatitude + ", Lon: " + newLongitude);
                run_stellarium(newLatitude, newLongitude, betterCity, time, redrawBackground, res0)
            })
        });
    } else {
        // use the supplied latitude and longitude
        console.log("Using " + betterCity + ", Lat: " + newLatitude + ", Lon: " + newLongitude);
        run_stellarium(newLatitude, newLongitude, betterCity, time, redrawBackground, res0)
    }
});

// helpers
function puts(error, stdout, stderr) {
    sys.puts(stdout)
}

function capture_stdout(error, stdout, stderr) {
    return (stdout)
}

// runs the external Stellarium script
function run_stellarium(latitude, longitude, city, time, redrawBackground, res) {
    var cmd = "bash skygrab.sh" + " " + latitude + " " + longitude + " '" + city + "' " + time + " " + redrawBackground;
    var updatedLocInfo = {
        "latitude": latitude,
        "longitude": longitude,
        "city": city
    };
    // console.log(cmd);
    exec(cmd, function(error, stdout, stderr) {
        res.send(updatedLocInfo);
    });
}
