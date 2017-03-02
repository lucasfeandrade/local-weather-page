
function getLatLng() {
    $.ajax({
        type: "POST",
        url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyA6SYCNM1MFqZ4wyOR5n65BG2KkORq6xS4',
        dataType: 'json',
        success: function (data) {
            console.log(data.location);
            let lat = data.location.lat;
            let lng = data.location.lng;
            getLocation(lat, lng);
            getWeather(lat, lng);
        }
    });

}

function getLocation(lat, lng){
    $.ajax({
        type: "POST",
        url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCVCiQNe-SmyPdWhpUf1eE1VJ7KXKjm0EU`,
        dataType: 'json',
        success: function (data) {
            json = JSON.stringify(data);
            results = data.results
            console.log(json);
            var level_1;
            var level_2;
            for (var x = 0, length_1 = results.length; x < length_1; x++){
              for (var y = 0, length_2 = results[x].address_components.length; y < length_2; y++){
                  var type = results[x].address_components[y].types[0];
                    if ( type === "administrative_area_level_1") {
                      level_1 = results[x].address_components[y].long_name;
                      if (level_2) break;
                    } else if (type === "locality"){
                      level_2 = results[x].address_components[y].long_name;
                      if (level_1) break;
                    }
                }
            }
            console.log(city);
            $('#city').text(`${level_1} ${level_2}`);
        }
    });

}

function getWeather(lat, lng) {
    $.ajax({
        type: "GET",
        url: `https://api.darksky.net/forecast/e2d52be494e5acebf1ab0b646016f040/${lat},${lng}`,
        dataType: 'jsonp',
        success: function (data) {
            console.log(data);
            fahrenheit = data.hourly.data[0].temperature;
            console.log(fahrenheit);
            let celsius = Math.round((fahrenheit - 32)*0.5556);
            console.log(celsius);
            $('#temperature').text( celsius+"°C" );
            weather = data.currently.icon;
            chooseWeatherIcon(weather);
        }
    });
}

function chooseWeatherIcon( weather ) {
    if ( weather == 'snow') 
        $('#weatherIcon').addClass("wi wi-snow");
    else if ( weather == 'clear-day')
        $('#weatherIcon').addClass("wi wi-day-sunny");
    else if ( weather == 'clear-night')
        $('#weatherIcon').addClass("wi wi-night-clear");
    else if ( weather == 'rain')
        $('#weatherIcon').addClass("wi wi-rain");
    else if ( weather == 'sleet')
        $('#weatherIcon').addClass("wi wi-night-clear");  
    else if ( weather == 'wind')
        $('#weatherIcon').addClass("wi wi-night-clear");  
    else if ( weather == 'fog')
        $('#weatherIcon').addClass("wi wi-fog");   
    else if ( weather == 'cloudy')
        $('#weatherIcon').addClass("wi wi-cloud"); 
    else if ( weather == 'partly-cloudy-day')
        $('#weatherIcon').addClass("wi wi-day-cloudy"); 
    else if ( weather == 'partly-cloudy-night')
        $('#weatherIcon').addClass("wi wi-night-alt-cloudy");
                
}

$(document).ready(function() {
    getLatLng();
});