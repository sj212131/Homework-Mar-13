var inputEl = $("#city-input");
var searchEl = $("#search-button");
var nameEL = $("#city-name");
var currentTempEl = $("temperature");
var currentHumidityEl = $("humidity");
var currentWindEl = $("wind-speed");
var currentUVEl = $("UV-index");

if (localStorage.getItem("search")) {
    var searchHis = JSON.parse(localStorage.getItem("search"))
} else {
    var searchHis = []
};
console.log(searchHis)