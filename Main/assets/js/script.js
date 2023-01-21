// Form Elements
var cityInputEl = $('#city-input');
var stateInputEl = $('#state-input');
var countryInputEl = $('#country-input');

var searchFormEl = $('#search-form');
var searchBtnEl = $('#search');

// Today Weather Data Content
var cityName = $('#city');
var todayDate = $('#date');
var weatherIcon = $('#icon');
var todayTemp = $('#temperature');
var todayWind = $('#wind');
var todayHumid = $('#humidity');
var todayUV = $('#uv-index')
var today = moment().format('DD/M/YYYY')

function getToday(city, state, country) {
  var apiKey = '32794bb53ba95f39cf7a5a2d11c7be39';
  var apiUrl = 'https://api.openweathermap.org/data/2.5/find?q=' + city + ',' + state + ',' + country + '&units=metric&appid=' + apiKey;
  console.log(apiUrl)

  fetch(apiUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();

    })

    .then(function (response) {
      var lat = response.list[0].coord.lat
      var lon = response.list[0].coord.lon

      // Displays City Name
      cityName.text(response.list[0].name);
      todayDate.text(today);

      todayTemp.text("Temperature: " + response.list[0].main.temp + "°C");

      todayWind.text("Wind Speed: " + response.list[0].wind.speed + "KPH");

      todayHumid.text("Humidity: " + response.list[0].main.humidity + "%");


      console.log(response);
      console.log(today);
      console.log(lat);
      console.log(lon);
    })
    .catch(function (error) {
      console.error(error);
    });

};

function getFiveDays (city, state, country) {

  var apiKey = '32794bb53ba95f39cf7a5a2d11c7be39'

  var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + ',' + state + ',' + country + '&appid=' + apiKey + '&exclude=hourly,current&units=metric&lang=en&cnt=5&mode=json&group=daily';
  console.log(apiUrl);
  fetch(apiUrl)
    .then(function (response) {
    
      if (!response.ok) {
        throw response.json();
      }

      return response.json();

    })

    .then(function (response) {
      console.log(response);

      console.log(response.list.length)
      for (let i = 0; i < response.list.length; i++) {
        let forecastDate = response.list[i].dt_txt;
        let date = moment(forecastDate).format("DD/MM/YYYY HH:mm");
        console.log(forecastDate)

        var temp = response.list[i].main.temp;
        
        var wind = response.list[i].wind.speed;

        var humidity = response.list[i].main.humidity;

        $(`[data-day="${i+1}"]`).find("#date").text(date);
        $(`[data-day="${i+1}"]`).find("#temperature").text("Temperature :" + temp + "°C")
        $(`[data-day="${i+1}"]`).find("#wind").text("Wind Speed :" + wind + " KPH")
        $(`[data-day="${i+1}"]`).find("#humidity").text("Humidity :" + humidity + "%")
      }

      // Displays City Name
      // cityName.text(response.list[0].name);
      // todayDate.text(today);

      // todayTemp.text("Temperature: " + response.list[0].main.temp + "°C");

      // todayWind.text("Wind Speed: " + response.list[0].wind.speed + "KPH");

      // todayHumid.text("Humidity: " + response.list[0].main.humidity + "%");



      // console.log(today);
      // console.log(lat);
    })
    .catch(function (error) {
      console.error(error);
    });
};


function handleSearchFormSubmit(event) {
  event.preventDefault();

  var city = cityInputEl.val();
  var state = stateInputEl.val();
  var country = countryInputEl.val();

  if (!city || !country) {
    console.error('Enter all required Fields');
    cityInputEl.addClass('invalid');
    countryInputEl.addClass('invalid');
    return;
  }

  console.log(city);
  console.log(state);
  console.log(country);

  getToday(city, state, country);
  getFiveDays(city, state, country);
}



searchFormEl.on('submit', handleSearchFormSubmit);