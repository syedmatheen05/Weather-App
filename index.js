let weatherForm = document.getElementById("weather-form");
let cityName = document.getElementById("city-name");
let temperature = document.getElementById("temperature");
let humidityDisplay = document.getElementById("humidity");
let desc = document.getElementById("desc");
let emoji = document.getElementById("emoji");
let errorDisplay = document.getElementById("error");
let card = document.getElementById("weather-card");
const apiKey="paste your openweather api key here";

weatherForm.addEventListener("submit", async event =>{
    event.preventDefault();
    try{
        const cityInput = document.getElementById("city-input").value;
        const weatherData = await getWeather(cityInput);
        displayInfo(weatherData);
    }
    catch(error){
        card.style.display = "block";
        errorDisplay.textContent = "Please enter a valid city";
    }

})
async function getWeather(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiURL);
    if(!response.ok){
        throw new Error("City not found");  
    }
    return response.json();
}
function displayInfo(weatherData){
    // object and array destructing
    const {name: city, main: {temp,humidity}, weather: [{description,id}]} = weatherData;
    cityName.textContent = city;
    temperature.textContent = `${(temp-273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}`;
    desc.textContent = description;
    emoji.textContent = getEmoji(id);
    card.style.display = "block";

}
function getEmoji(id){
    switch(true){
        case(id >= 200 && id < 300):
            return "⛈️";
        case(id >= 300 && id < 600): 
            return "🌧️";
        case(id >= 600 && id < 700): 
            return "🌨️";
        case(id >= 700 && id < 800): 
            return "🍃";
        case(id == 800): 
            return "☀️";
        case(id >= 800 && id < 810): 
            return "☁️";
        default:
            return "❔";
    }

}