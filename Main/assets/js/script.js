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

function getToday(city, state, country) {
 var apiUrl = 'https://api.openweathermap.org/data/2.5/find?q=' + city +','+state+ ',' + country + '&units=metric&appid=32794bb53ba95f39cf7a5a2d11c7be39'
console.log(apiUrl)

fetch(apiUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })

    .then(function (response) {
      // Displays City Name
      cityName.text(response.list[0].name);
      var today = moment().format('DD/M/YYYY')
      todayDate.text(today);

      
      console.log(response);
      console.log(today);
      console.log(response.list[0].name)

      // if (!locRes.results.length) {
      //   console.log('No results found!');
      //   resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
      // } else {
      //   resultContentEl.textContent = '';
      //   for (var i = 0; i < locRes.results.length; i++) {
      //     printResults(locRes.results[i]);
      //   }
      // }
    })
    .catch(function (error) {
      console.error(error);
    });

}

function handleSearchFormSubmit (event) {
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
}

searchFormEl.on('submit', handleSearchFormSubmit);