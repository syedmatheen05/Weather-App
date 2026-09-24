let weatherForm = document.getElementById("weather-form");
let cityName = document.getElementById("city-name");
let temperature = document.getElementById("temperature");
let humidity = document.getElementById("humidity");
let desc = document.getElementById("desc");
let emoji = document.getElementById("emoji");
let errorDisplay = document.getElementById("error");
let card = document.getElementById("weather-card");
const apiKey="42cc3e9c7e2843e417389734040d8e0d";

weatherForm.addEventListener("submit", async event =>{
    event.preventDefault();
    try{
        const cityInput = document.getElementById("city-input").value;
        const weatherData = await getWeather(cityInput);
        displayInfo(weatherData);
    }
    catch(error){
        card.textContent = "";
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
    const {name: city, main: {temp,humidity}, weather: [{description,id}]} = weatherData;
    card.textContent="";


}
