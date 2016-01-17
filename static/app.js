$(document).ready(function() {

    var autoPlaceName = 'location';
    var autoLatitude = 'latitude';
    var autoLongitude = 'longitude';
    var time = 300;
    var MAX_TIME = 3000;
    var animation_running = false;
    var COUNT_RESET = 300;


    jQuery.ajax({
        url: '//freegeoip.net/json/',
        type: 'POST',
        dataType: 'jsonp',
        success: function(location) {
            console.log(location);

            // example where I update content on the page.
            jQuery('#placeName').val(location.city);
            jQuery('#longitude').val(location.longitude);
            jQuery('#latitude').val(location.latitude);
            // jQuery('#region-code').html(location.region_code);
            // jQuery('#region-name').html(location.region_name);
            // jQuery('#areacode').html(location.areacode);
            // jQuery('#ip').html(location.ip);
            // jQuery('#zipcode').html(location.zipcode);
            // jQuery('#country-name').html(location.country_name);
            // jQuery('#country-code').html(location.country_code);

            autoPlaceName = location.city;
            autoLatitude = location.latitude;
            autoLongitude = location.latitude;
        }
    });

    // jQuery.get("execute", function(data, status) {
    //     console.log(data);
    // });

    $('#submitLLButton').click(function(e) {
        $.ajax({
            url: 'execute',
            type: 'POST',
            data: {
                "submit": true,
                "placeName": jQuery('#placeName').val(),
                "latitude": jQuery('#latitude').val(),
                "longitude": jQuery('#longitude').val(),
                "autoPlaceName": autoPlaceName,
                "autoLatitude": autoLatitude,
                "autoLongitude": autoLongitude,
                "doLookup": false,
                "time": time,
                "redrawBackground": 1
            },
            success: function(result) {
                $('.skyImage').attr({
                    "src": 'sky.png?' + new Date().getTime()
                });
                jQuery('#placeName').val("");
            }
        });
    });

    $('#submitCityButton').click(function(e) {
        console.log(time);
        if (jQuery('#placeName').val() == "") {
            alert("City is empty!");
            return;
        }
        $.ajax({
            url: 'execute',
            type: 'POST',
            data: {
                "submit": true,
                "placeName": jQuery('#placeName').val(),
                "latitude": jQuery('#latitude').val(),
                "longitude": jQuery('#longitude').val(),
                "autoPlaceName": autoPlaceName,
                "autoLatitude": autoLatitude,
                "autoLongitude": autoLongitude,
                "doLookup": true,
                "time": time,
                "redrawBackground": 1
            },
            success: function(result) {
                $('.skyImage').attr({
                    "src": 'sky.png?' + new Date().getTime()
                });
                console.log(result);
                jQuery('#latitude').val(result.latitude);
                jQuery('#longitude').val(result.longitude);
                jQuery('#placeName').val(result.city);
            }
        });
    });

    var count = 300;
    var redrawBackgroundCount = 1;

    $('#submitAnimateButton').click(function(e) {

        if (animation_running == true) {
            animation_running = false;
            createjs.Ticker.removeEventListener("tick", tick);
            createjs.Ticker.off("tick", tick);
            $('#submitAnimateButton').text('Start Animation');
            return;
        }

        count = COUNT_RESET;
        redrawBackgroundCount = 1;

        drawFrame(count, true, redrawBackgroundCount);

        redrawBackgroundCount = 0;


        createjs.Ticker.setInterval(2000);

        createjs.Ticker.addEventListener("tick", tick);
        animation_running = true;


        $('#submitAnimateButton').text('Stop Animation');

        function tick() {
            console.log("TICK!!!" + count);
            drawFrame(count, false, redrawBackgroundCount);
            count = count + 50;
            // redrawBackgroundCount = 1-redrawBackgroundCount;
            if (count > MAX_TIME) {
                count = COUNT_RESET;
            }
        }

    });


    function drawFrame(timeVal, doLookup, redrawBackground) {
        console.log(timeVal);
        $.ajax({
            url: 'execute',
            type: 'POST',
            data: {
                "submit": true,
                "placeName": jQuery('#placeName').val(),
                "latitude": jQuery('#latitude').val(),
                "longitude": jQuery('#longitude').val(),
                "autoPlaceName": autoPlaceName,
                "autoLatitude": autoLatitude,
                "autoLongitude": autoLongitude,
                "doLookup": doLookup,
                "time": timeVal,
                "redrawBackground": redrawBackground
            },
            success: function(result) {
                $('.skyImage').attr({
                    "src": 'sky.png?' + new Date().getTime()
                });
                console.log(result);
                jQuery('#latitude').val(result.latitude);
                jQuery('#longitude').val(result.longitude);
                jQuery('#placeName').val(result.city);
            }
        });
    }

})
