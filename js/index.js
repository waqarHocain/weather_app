/**
 * Author: Waqar Hocain <waqarmaxtan@gmail.com>
 * Project: Weather App
 * Description: A simple weather app, which displays the current weather. It fetch your location from your IP Address. So, if you're using a proxy, you may get inaccurate results.
 * I've used the following services:
 * -- http://openweathermap.org   // for getting weather information
 * -- http://ip-api.com           // to get location of an IP Address
 * 
 * Libraries:
 * -- jQuery                      // for easy DOM manipulation
 * -- normalize                   // get rid of default browser styles
 * -- unGrid                      // extremely small css layout grid
 *
 * -- Fonts:                      
 * -- OpenSans
 */

$(document).ready(function () {
  $.get("http://ip-api.com/json", function(response) {
  var city = response.city,
      country = response.country;

  var lat = response.lat,
      lon = response.lon;
   
  $(".loc").append(city + ", " + country);
  
  get_weather(lat, lon);

}, "jsonp"); // location
  
// Temperature is fetched in Kelvins, this function will convert it to celsius
function kelvin_to_celsius(num) {
  return Math.round(num - 273.15);
} // kelvin to celsius

function get_weather(lat, lon) {
  var api_key = "8faad3c4e813378dd45bfb8a880ab427",
      weather_api_url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid=" + api_key;
  
  $.get(weather_api_url, function(res) {
    
    var temp = Math.round(res.main.temp);

    $(".temp").html(temp + " C").addClass("c");
    $(".cond")
      .append(res.weather[0].main)
      .css("background-image", "url(http://openweathermap.org/img/w/"+res.weather[0].icon+".png)");
    
    
  }, "jsonp");
} // get_weather
  
$(".convert").on("click", convert_temp);
  
function convert_temp(e) {
  e.preventDefault();
  var temp = parseFloat($(".temp").text());
  
  if($(".temp").hasClass("c")) {
    
  $(".temp").removeClass("c").addClass("f"); 
    temp = Math.round((temp * 1.8) + 32);
    $(".temp").text(temp + " F");
    $(".convert").html("<a href=''>Convert to <b>Celsius</b></a>");
    
  }  else if($(".temp").hasClass("f")) {
    $(".temp").removeClass("f").addClass("c");
    temp = Math.round((temp - 32) / 1.8);
    $(".temp").text(temp + " C");
    $(".convert").html("<a href=''>Convert to <b>Fahrenheit</b></a>");
  }
} // convert_temp
}); // ready