const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const message = document.getElementById("message");

const weatherCodes = {
  0: ["Clear sky", "☀️"],
  1: ["Mostly clear", "🌤️"],
  2: ["Partly cloudy", "⛅"],
  3: ["Overcast", "☁️"],
  45: ["Foggy", "🌫️"],
  48: ["Rime fog", "🌫️"],
  51: ["Light drizzle", "🌦️"],
  53: ["Drizzle", "🌦️"],
  55: ["Heavy drizzle", "🌧️"],
  56: ["Freezing drizzle", "🌧️"],
  57: ["Freezing drizzle", "🌧️"],
  61: ["Light rain", "🌦️"],
  63: ["Rain", "🌧️"],
  65: ["Heavy rain", "🌧️"],
  66: ["Freezing rain", "🌧️"],
  67: ["Heavy freezing rain", "🌧️"],
  71: ["Light snow", "🌨️"],
  73: ["Snow", "❄️"],
  75: ["Heavy snow", "🌨️"],
  77: ["Snow grains", "❄️"],
  80: ["Rain showers", "🌦️"],
  81: ["Rain showers", "🌧️"],
  82: ["Heavy showers", "⛈️"],
  85: ["Snow showers", "🌨️"],
  86: ["Heavy snow showers", "🌨️"],
  95: ["Thunderstorm", "⛈️"],
  96: ["Thunderstorm with hail", "⛈️"],
  99: ["Thunderstorm with hail", "⛈️"]
};

function getWeatherInfo(code) {
  return weatherCodes[code] || ["Weather conditions", "🌤️"];
}

function showMessage(text) {
  message.textContent = text;
}

async function getWeather(city) {
  showMessage("Finding your little spot on the map...");

  try {
    // First, find the city's latitude and longitude.
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
    const geoResponse = await fetch(geoUrl);

    if (!geoResponse.ok) throw new Error("Could not search for that city.");
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("City not found. Try another name.");
    }

    const place = geoData.results[0];
    showMessage("Checking the weather...");

    // Use the coordinates to get current weather and the 5-day forecast.
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&timezone=auto&forecast_days=5`;
    const weatherResponse = await fetch(weatherUrl);

    if (!weatherResponse.ok) throw new Error("Weather data is unavailable right now.");
    const data = await weatherResponse.json();

    showCurrentWeather(place, data);
    showForecast(data.daily);
    showMessage("");
  } catch (error) {
    showMessage(error.message || "Something went wrong. Please try again.");
  }
}

function showCurrentWeather(place, data) {
  const current = data.current;
  const today = data.daily;
  const weather = getWeatherInfo(current.weather_code);
  const date = new Date(current.time);

  document.getElementById("cityName").textContent =
    `${place.name}${place.country ? ", " + place.country : ""}`;
  document.getElementById("todayDate").textContent =
    date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  document.getElementById("weatherIcon").textContent =
    current.is_day ? weather[1] : (current.weather_code === 0 ? "🌙" : weather[1]);
  document.getElementById("temperature").textContent = Math.round(current.temperature_2m);
  document.getElementById("condition").textContent = weather[0];
  document.getElementById("feelsLike").textContent = `${Math.round(current.apparent_temperature)}°C`;
  document.getElementById("highLow").textContent =
    `${Math.round(today.temperature_2m_max[0])}° / ${Math.round(today.temperature_2m_min[0])}°`;

  document.getElementById("humidity").textContent = `${current.relative_humidity_2m}%`;
  document.getElementById("wind").textContent = `${Math.round(current.wind_speed_10m)} km/h`;
  document.getElementById("detailFeels").textContent = `${Math.round(current.apparent_temperature)}°C`;
  document.getElementById("uv").textContent = today.uv_index_max[0].toFixed(1);
}

function showForecast(daily) {
  const forecastList = document.getElementById("forecastList");
  forecastList.innerHTML = "";

  daily.time.forEach((date, index)=> {
    const dayName = index === 0
      ? "Today"
      : new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { weekday: "short" });

    const weather = getWeatherInfo(daily.weather_code[index]);
    const day = document.createElement("div");
    day.className = "forecast-day";

    day.innerHTML = `
      <span class="forecast-name">${dayName}</span>
      <span class="forecast-icon">${weather[1]}</span>
      <span class="forecast-temp">${Math.round(daily.temperature_2m_max[index])}°</span>
      <span class="forecast-low">${Math.round(daily.temperature_2m_min[index])}° low</span>
    `;

    forecastList.appendChild(day);
  });
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();
  if (!city) {
    showMessage("Type a city name first ✿");
    cityInput.focus();
    return;
  }

  getWeather(city);
});

//default city
getWeather("Varanasi");
