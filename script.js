
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
            let city = data.results[3].address_components[0].long_name;
            console.log(city);
            $('#city').text(city);
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
            $('#temperature').text(` ${celsius}C`);
        }
    });
}


$(document).ready(function() {
    getLatLng();
});