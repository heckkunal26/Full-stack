const container = document.getElementById("weatherContainer");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

// 3 cities with coordinates
const cities = [
{ name: "Delhi", lat: 28.61, lon: 77.20 },
{ name: "London", lat: 51.50, lon: -0.12 },
{ name: "Tokyo", lat: 35.68, lon: 139.69 }
];

// convert weather code to emoji
function getWeatherEmoji(code){
if(code === 0) return "☀️";
if(code <= 3) return "⛅";
if(code <= 48) return "🌫";
if(code <= 67) return "🌧";
if(code <= 77) return "❄️";
if(code <= 99) return "⛈";
return "🌤";
}

// create weather card
function createCard(city,temp,code){
const emoji = getWeatherEmoji(code);

const card = document.createElement("div");
card.className="card";

card.innerHTML=`
<h2>${city}</h2>
<div class="emoji">${emoji}</div>
<div class="temp">${temp}°C</div>
<p>Weather Code: ${code}</p>
`;

container.appendChild(card);
}

// fetch weather
function fetchWeather(city){

const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`;

return fetch(url)
.then(res=>res.json())
.then(data=>{
return {
name: city.name,
temp: data.current_weather.temperature,
code: data.current_weather.weathercode
};
});
}

// load weather for all cities
function loadWeather(){

loading.style.display="block";

Promise.all(cities.map(fetchWeather))

.then(results=>{
loading.style.display="none";

results.forEach(city=>{
createCard(city.name,city.temp,city.code);
});

})

.catch(()=>{
loading.style.display="none";
error.textContent="⚠ Failed to load weather data.";
});
}

loadWeather();