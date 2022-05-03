document.addEventListener('DOMContentLoaded', submitButtonsReady);

function submitButtonsReady(){
  document.getElementById('dateInput').addEventListener('click', function(event){
    var request = new XMLHttpRequest();
    var date = document.getElementById('dateValue').value;
    var roverName = "";

    var buttonStatus1 = document.getElementById('button1').checked;
    var buttonStatus2 = document.getElementById('button2').checked;
    var buttonStatus3 = document.getElementById('button3').checked;

    if(buttonStatus1 === true)
    {
      roverName = "curiosity";
    }
    else if(buttonStatus2 === true)
    {
      roverName = "opportunity";
    }
    else 
    {
      roverName = "spirit";
    }


if(roverName === "curiosity"){
    function parseData(){
        var url = 'https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json';
        $.getJSON(url, function(data){
            data.soles.terrestrial_date
            loadMain(data.soles[0]);
        }); 
    }	
}

      else  
      { 
            console.log("Error in network request: " + request.statusText);
       }
    document.getElementById('weatherStatus').textContent = 'Please try a different date or check your syntax!';
    request.send(null);
    event.preventDefault();
});
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
    var highCelsius = solObject.max_temp;
    var lowCelsius = solObject.min_temp;
    var highFahrenheit = Math.round(highCelsius * 9/5 + 32);
    var lowFahrenheit = Math.round(lowCelsius * 9/5 + 32);
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
    forecast.insertAdjacentHTML('beforeend', weatherItem);
    var filler = 'filler';
    var pressure = solObject.pressure;
    var sunrise = solObject.sunrise;
    var sunset = solObject.sunset;
    var season_ls = solObject.ls;
    var season = undefined;
    if(season_ls < 30) {
        season = "early autumn"; 
    } else if (season_ls >= 30 && season_ls < 60)  {
        season = "middle autumn"; 
    } else if (season_ls >= 60 && season_ls < 90)  {
        season = "late autumn"; 
    } else if(season_ls >= 90 && season_ls < 120) {
        season = "early winter"; 
    } else if (season_ls >= 120 && season_ls < 150)  {
        season = "middle winter"; 
    } else if (season_ls >= 150 && season_ls < 180)  {
        season = "late winter"; 
    } else if(season_ls >= 180 && season_ls < 210) {
        season = "early spring"; 
    } else if (season_ls >= 210 && season_ls < 240)  {
        season = "middle spring"; 
    } else if (season_ls >= 240 && season_ls < 270)  {
        season = "late spring"; 
    } else if(season_ls >= 270 && season_ls < 300) {
        season = "early summer"; 
    } else if (season_ls > 300 && season_ls <= 330)  {
        season = "middle summer"; 
    } else if (season_ls > 330 && season_ls <= 360)  {
        season = "late summer"; 
    }

    var weather_observation = '<tr><th scope="row" class="sol">'+ earthMonthDay + ', ' + date.getUTCFullYear() +'</th><th scope="row" class="sol">'+ sol +'</th><td class="temperature max"><span class="fahrenheit"><nobr>'+ highFahrenheit +'</nobr></span><span class="celsius"><nobr>'+ highCelsius +'</nobr></span></td><td class="temperature min"><span class="fahrenheit"><nobr>'+ lowFahrenheit +'</nobr></span><span class="celsius"><nobr>'+ lowCelsius +'</nobr></span></td><td class="pressure max">'+ pressure +'</td><td class="sun rise">'+ sunrise +'</td><td class="sun set">'+ sunset +'</td></tr>';

        $('#weather_observation').prepend(weather_observation);
        $('#weather_top').prependTo('#weather_observation');
        if(season != undefined) {
            $('.season_text').html("At this location, it's currently "+season+".");
        }

    showFahrenheit();
}