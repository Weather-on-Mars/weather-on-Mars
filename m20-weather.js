$(document).ready(function() {
    parseData();
    showFahrenheit();
    var nodata = '<span class="nodata">N/A</span>';
    

    function showCelsius() {
        $(".celsius").show();
        $(".fahrenheit").hide();
        $(".degree .lbl_fahrenheit").addClass('fadeWhite');
        $(".degree .lbl_celsius").removeClass('fadeWhite');
        $("#temperature_lbl .lbl_fahrenheit").addClass('fadeBlack');
	    $("#temperature_lbl .lbl_celsius").removeClass('fadeBlack');
    }
    function showFahrenheit() {
        $(".fahrenheit").show();
        $(".celsius").hide();
        $(".degree .lbl_celsius").addClass('fadeWhite');
        $(".degree .lbl_fahrenheit").removeClass('fadeWhite');
        $("#temperature_lbl .lbl_celsius").addClass('fadeBlack');
	    $("#temperature_lbl .lbl_fahrenheit").removeClass('fadeBlack');
    }

    $( ".lbl_celsius" ).click(function() {
        showCelsius();
    });
    $( ".lbl_fahrenheit" ).click(function() {
        showFahrenheit();
    });
    
    function parseData(){
        var url = 'https://mars.nasa.gov/rss/api/?feed=weather&category=mars2020&feedtype=json';
        $.getJSON(url, function(data){
            data.sols.sort(function(a, b){
                return a.sol - b.sol;
            });
            console.log(data);
            var count = -1;
            for(var i = 6; i >= 0; i--){
                if((data.sols[i].sol >= 15) && (data.sols[i].min_temp != '--' && data.sols[i].max_temp != '--')) {
                loadWeather(data.sols[i]);
                }
                    count++
            }
            loadMain(data.sols[count]);
        }); 
    }	

    function checkStatus(response){
        if (response.status === 200){
            return Promise.resolve(response);
        }
        else {
            return Promise.reject(new Error(response.statusText));
        }
    }

    function getJSON(response){
        return response.json();
    }

    function loadWeather(solObject){
        var sol = solObject.sol;    
        var months = [ "Jan.", "Feb.", "Mar.", "Apr.", "May", "June",
        "July", "Aug.", "Sep.", "Oct.", "Nov.", "Dec." ];
        var earthDate = solObject.terrestrial_date;
        var date = new Date(earthDate);
        var earthMonth = months[date.getUTCMonth()];
        var earthDay = date.getUTCDate();
        var earthMonthDay = earthMonth + ' ' + earthDay;
        var highCelsius = Math.round(solObject.max_temp);
        var lowCelsius = Math.round(solObject.min_temp);
        var highFahrenheit = Math.round(solObject.max_temp * 9/5 + 32);
        var lowFahrenheit = Math.round(solObject.min_temp * 9/5 + 32);
        if (isNaN(solObject.max_temp)) {highCelsius = nodata; highFahrenheit = nodata;} else {highCelsius += '&deg;C'; highFahrenheit += '&deg;F';}
        if (isNaN(solObject.min_temp)) {lowCelsius = nodata; lowFahrenheit = nodata;} else {lowCelsius += '&deg;C'; lowFahrenheit += '&deg;F';}
        var beginning = '<div class="item">';
        var dateSol = '<span class="dateSol">Sol '+ sol +'</span>';
        var dateUTC = '<span class="dateUTC">'+ earthMonthDay +'</span><div class="fadeWhiteLine"></div>'
        var fahrenheit = '<div class="fahrenheit"><div class="high">High: '+ highFahrenheit +'</div><div class="low">Low: '+ lowFahrenheit +'</div></div>';
        var celsius = '<div class="celsius"><div class="high">High: '+ highCelsius +'</div><div class="low">Low: '+ lowCelsius +'</div></div>';
        var end = '</div>';
        var forecast = document.getElementById('Forecast');

        var weatherItem = beginning + dateSol + dateUTC + fahrenheit + celsius + end;
        //forecast.insertAdjacentHTML('afterbegin', weatherItem);
        var filler = 'filler';
        var pressure = solObject.pressure;
        var sunrise = solObject.sunrise;
        var sunset = solObject.sunset;
        var season = solObject.season;

        if(pressure === "--") {pressure = nodata}
        if(sunrise === "--") {sunrise = nodata}
        if(sunset === "--") {sunset = nodata}
        if(season === "--") {season = nodata}

        var weather_observation = '<tr><th scope="row" class="sol">'+ earthMonthDay + ', ' + date.getUTCFullYear() +'</th><th scope="row" class="sol">'+ sol +'</th><td class="temperature max"><span class="fahrenheit"><nobr>'+ highFahrenheit +'</nobr></span><span class="celsius"><nobr>'+ highCelsius +'</nobr></span></td><td class="temperature min"><span class="fahrenheit"><nobr>'+ lowFahrenheit +'</nobr></span><span class="celsius"><nobr>'+ lowCelsius +'</nobr></span></td><td class="pressure max">'+ pressure +'</td><td class="sun rise">'+ sunrise +'</td><td class="sun set">'+ sunset +'</td></tr>';

            $('#weather_observation').append(weather_observation);
            $('#weather_top').prependTo('#weather_observation');
            if(season != undefined) {
                $('.season_text').html("At this location, it's currently "+season+".");
            }
        showFahrenheit();
    }

    function loadMain(solObject){
        var sol = solObject.sol;    
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var earthDate = solObject.terrestrial_date;
        var date = new Date(earthDate);
        var earthMonth = months[date.getUTCMonth()];
        var earthDay = date.getUTCDate();
        var earthMonthDay = earthMonth + ' ' + earthDay + ', ' + date.getUTCFullYear();
        var highCelsius = Math.round(solObject.max_temp);
        var lowCelsius = Math.round(solObject.min_temp);
        var highFahrenheit = Math.round(solObject.max_temp * 9/5 + 32);
        var lowFahrenheit = Math.round(solObject.min_temp * 9/5 + 32);

        if (isNaN(highCelsius)) {highCelsius = nodata;} else {highCelsius += '&deg;';}
        if (isNaN(lowCelsius)) {lowCelsius = nodata;} else {lowCelsius += '&deg;';}
        if (isNaN(highFahrenheit)) {highFahrenheit = nodata;} else {highFahrenheit += '&deg;';}
        if (isNaN(lowFahrenheit)) {lowFahrenheit = nodata;} else {lowFahrenheit += '&deg;';}

        $('.marsDate').text('Sol ' + sol);
        $('.earthDate').text(earthMonthDay);
        $('.highs .fahrenheit').html(highFahrenheit);
        $('.highs .celsius').html(highCelsius);
        $('.lows .fahrenheit').html(lowFahrenheit);
        $('.lows .celsius').html(lowCelsius);
    }
});