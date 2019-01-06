var appid = '2bdc2b508dab558004426af7ec95f187';  // insert valid APPID here

function onWeather(err, data) {
  if(err) {
    /*
     * Toggle the results display for the response display.
     * Print an error message in the error element and change its display so
     * that it is no longer hidden.
     */

    document.getElementById("response").style.display = "";
    document.getElementById("results").style.display = "none";

    var el = document.getElementById("error");
    el.innerHTML = "Error: Could not find weather information.";
    el.style.display = "";

    return;
  }

  // Empty the error element and hide it.
  document.getElementById("error").innerHTML = "";
  document.getElementById("error").style.display = "none";

  var el = document.getElementById("response");

  var temp = data.main.temp;
  document.getElementById("temp").innerHTML = temp + " &deg;F";

  var windspeed = data.wind.speed;

  // Set the element with ID windspeed's content to the windspeed above,
  // with the unit "mph" afterwards
  document.getElementById("windspeed").innerHTML = windspeed + "mph";

  var iconUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
  var iconEl = document.getElementById("icon");

  // Create an img tag with src set to iconUrl, and set the content of the
  // icon element to that image.
  var img = document.createElement("img");
  img.setAttribute("src", iconUrl);

  if (iconEl.hasChildNodes()) {
    iconEl.removeChild(iconEl.childNodes[0]); // remove previous icon 
  }

  iconEl.appendChild(img);

  var locationEl = document.getElementById("location");
  locationEl.innerHTML = data.name;

  // Make the response element and results elements both visible
  el.style.display = "";
  document.getElementById("results").style.display = "";
}

function onZipCode(err, data) {
  if(err) {
    /*
     * Toggle the results display for the response display.
     * Print an error message in the error element and change its display so
     * that it is no longer hidden.
     */

    document.getElementById("response").style.display = "";
    document.getElementById("results").style.display = "none";

    var el = document.getElementById("error");
    el.innerHTML = "Error: Zip code does not exist.";
    el.style.display = "";

    return;
  }

  var firstMatch = data.places[0];

  /*
   * Get the city name, state name and country from the place data returned by
   * the Zippopotamus API.
   */

  var city = firstMatch["place name"];
  var state = firstMatch["state"];
  var country = data["country"];

  var url = "http://api.openweathermap.org/data/2.5/weather";

  /*
   * Access the url above with the query string below:
   *   ?APPID=[APPID]&units=imperial&q=[CITY],[STATE],[COUNTRY]
   * Where the things in brackets were found above.
   */

  AJAX.getJSON(url + "?APPID=" + appid + "&units=imperial&q=" + city +
  "," + state + "," + country, onWeather);

}

function getWeather(e) {
  e.preventDefault(); // stop submit
  var zipCode = document.getElementById("zipCode").value;
  if(!zipCode) {
    /*
     * Toggle the results display for the response display.
     * Print an error message in the error element and change its display so
     * that it is no longer hidden.
     */

    document.getElementById("response").style.display = "";
    document.getElementById("results").style.display = "none";

    var el = document.getElementById("error");
    el.innerHTML = "Error: No zip code entered.";
    el.style.display = "";

    return;
  }

  /*
   * Access the url http://api.zippopotam.us/us/ZZZZZ where ZZZZZ is the given
   * zip code.
   */
   
   var url = "http://api.zippopotam.us/us/" + zipCode;
   AJAX.getJSON(url, onZipCode);
}
