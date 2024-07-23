let key ="0f2432dd7f175dbcc35cba608c6c7300";

const getweather = async (city) => {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
  let response = await fetch(url);
  response = await response.json(); 
  
  console.log(response);
  
  return response;
}
let img = document.querySelector(".weatherimg")
let btn = document.querySelector("#getWeatherBtn");
let input = document.querySelector("input");
let place = document.querySelector(".location-value");
let temperature = document.querySelector(".temperature-value");
let weather = document.querySelector(".weather-value");
let humidity = document.querySelector(".humidity-value");
let wind = document.querySelector(".wind-speed-value");
let sunrise = document.querySelector(".sunrise-value");
let sunset = document.querySelector(".sunset-value");

btn.addEventListener("click", async (e) => {
  
  let response = await getweather(input.value);
  
  place.innerText=response.name;
  temperature.innerText = `${Math.round(response.main.temp - 273.15)}°C`;
  weather.innerText = response.weather[0].main;
  humidity.innerHTML = response.main.humidity;
  wind.innerText = `${response.wind.speed} m/s`; 
  
let sunriseTimestamp = response.sys.sunrise;

let sunriseDate = new Date(sunriseTimestamp * 1000);


let sunriseHours = sunriseDate.getHours();
let sunriseMinutes = sunriseDate.getMinutes();

let formattedSunrise = `${sunriseHours}:${(sunriseMinutes < 10 ? '0' : '') + sunriseMinutes}`;

 sunrise.innerText=(`${formattedSunrise} A.M`);

let sunsetTimestamp = response.sys.sunset;

let sunsetDate = new Date(sunsetTimestamp * 1000);

let sunsetHoursUTC = sunsetDate.getUTCHours();
let sunsetMinutes = sunsetDate.getMinutes();

let sunsetHoursIST = sunsetHoursUTC + 5; 

let sunsetMinutesIST = sunsetMinutes + 30;

if (sunsetMinutesIST >= 60) {
  sunsetMinutesIST -= 60;
  sunsetHoursIST += 1;
}


let formattedSunset = `${sunsetHoursIST}:${(sunsetMinutesIST < 10 ? '0' : '') + sunsetMinutesIST}`;


console.log(`Sunset time in IST: ${formattedSunset}`);
sunset.innerText=(`${formattedSunset} P.M`);

if (response.weather[0].main == "Clouds") {
  img.src = "clouds.png"
}

else if (response.weather[0].main == "Clear") {
  img.src = "clear.png"
}

else if (response.weather[0].main == "Drizzle") {
  img.src = "drizzle.png"
}

else if (response.weather[0].main == "Mist") {
  img.src = "mist.png"
}

else if (response.weather[0].main == "Rain") {
  img.src = "rain.png"
}

else if (response.weather[0].main == "Snow") {
  img.src = "Snow.png"
}


});