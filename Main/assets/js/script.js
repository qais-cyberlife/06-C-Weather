var cityInputEl = $('#city-input'); 
var stateInputEl = $('#state-input');
var countryInputEl = $('#country-input');

var searchFormEl = $('#search-form');
var searchBtnEl = $('#search');

function searchApi(city, state, country) {
 var apiUrl = 'https://api.openweathermap.org/data/2.5/find?q=' + city +','+state+ ',' + country + '&units=metric&appid=32794bb53ba95f39cf7a5a2d11c7be39'
console.log(apiUrl)
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

    searchApi(city, state, country);
}

searchFormEl.on('submit', handleSearchFormSubmit);