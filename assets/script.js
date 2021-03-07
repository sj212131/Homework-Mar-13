var inputEl = $("#city-input");
var searchEl = $("#search-button");
var nameEL = $("#city-name");
var currentTempEl = $("#temperature");
var currentHumidityEl = $("#humidity");
var currentWindEl = $("#wind-speed");
var currentUVEl = $("#UV-index");
var APIKey = "06124cd13513f5e7de12e7d8eae9b5c0";


if (localStorage.getItem("search")) {
    var searchHis = JSON.parse(localStorage.getItem("search"))
} else {
    var searchHis = []
};
console.log(searchHis);

weatherInfo("Baltimore")//worked Delete after!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
function weatherInfo(cityName){
    var locQueryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;

    fetch(locQueryUrl)
        .then(function (response) {
            if (!response.ok){
                throw response.json();
            }
            return response.json();
        })
        .then(function (locRes) {
            console.log(locRes);

            //time element
            var currentTime = moment().format('MMMM Do YYYY');

            // //insert data
            nameEL.text(locRes.name + " " +currentTime);
            console.log(nameEL.text())//worked Delete after!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

            currentTempEl.text("Temperature: " + locRes.main.temp + " F");
            currentHumidityEl.text("Humidity: " + locRes.main.humidity + " %");
            currentWindEl.text("Wind Speed: " + locRes.wind.speed + " MPH");

            //http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}
            var latVal = locRes.coord.lat;
            var lonVal = locRes.coord.lon;
            var UVQueryURL = "http:api.openweathermap.org/data/2.5/uvi?lat=" + latVal + "&lon=" + lonVal + "&appid=" + APIKey;
            console.log(UVQueryURL)
            fetch(UVQueryURL)
                .then(function (response) {
                if (!response.ok){
                    throw response.json();
                }
                return response.json();
            })
                .then(function(UVRes){
                    console.log(UVRes);
                    console.log(UVRes.value);
                    
                    currentUVEl.append(UVRes.value);
                    if (UVRes.value < 3) {
                        currentUVEl.addClass("UVBackgroundLow");
                    } if (UVRes.value >= 3 && UVRes.value < 6) {
                        currentUVEl.addClass("UVBackgroundMod");
                    } if (UVRes.value >= 6 && UVRes.value < 8) {
                        currentUVEl.addClass("UVBackgroundHigh");
                    } if (UVRes.value >= 8 && UVRes.value < 11) {
                        currentUVEl.addClass("UVBackgroundVHigh");
                    } if (UVRes.value >= 11) {
                        currentUVEl.addClass("UVBackgroundExtra");
                    } 
                    
                    
                })
        })

        
    };

    