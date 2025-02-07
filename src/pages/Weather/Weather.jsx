import { useState } from "react";
import axios from 'axios';
import '../Weather/Weather.css';

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = "584b0393ed7554a477bb18425a75858b";

  // Fetch weather data using Axios
  const fetchWeatherData = async (city) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      throw new Error("Could not fetch weather data");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (city.trim()) {
      try {
        const data = await fetchWeatherData(city);
        setWeatherData(data);
        setError(null);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Could not fetch weather data. Please try again.");
        setWeatherData(null);
      }
    } else {
      setError("Please enter a valid city name.");
      setWeatherData(null);
    }
  };

  // Get weather emoji based on weather conditions
  const getWeatherEmoji = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300) return "⛈️";
    if (weatherId >= 300 && weatherId < 600) return "🌧️";
    if (weatherId >= 600 && weatherId < 700) return "❄️";
    if (weatherId >= 700 && weatherId < 800) return "🌫️";
    if (weatherId === 800) return "☀️";
    if (weatherId > 800) return "☁️";
    return "❓";
  };

  // Get farmer advice based on weather conditions
  const getFarmerAdvice = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300) {
      return "Stormy weather ahead! Avoid fieldwork if possible. Secure equipment and check field drainage to avoid flooding.";
    }
    if (weatherId >= 300 && weatherId < 600) {
      return "Rain expected. Consider wearing waterproof gear, and check plant roots to prevent waterlogging.";
    }
    if (weatherId >= 600 && weatherId < 700) {
      return "Snowy conditions. Protect sensitive plants and take measures to prevent frost damage.";
    }
    if (weatherId >= 700 && weatherId < 800) {
      return "Foggy weather. Be cautious on roads and reduce any field spraying activities due to low visibility.";
    }
    if (weatherId === 800) {
      return "Clear skies. Ideal for fieldwork! Remember to wear a hat and stay hydrated.";
    }
    if (weatherId > 800) {
      return "Cloudy but calm. Good for field activities; ensure plants receive adequate water if it’s dry.";
    }
    return "Weather information is unclear. Proceed with caution and consult local guidelines.";
  };

  return (
    <div className="weatherContainer">
      <form onSubmit={handleSubmit} className="weatherForm">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="cityInput"
        />
        <button type="submit" className="submitButton">Get Weather</button>
      </form>

      {error && <div className="error">{error}</div>}

      {weatherData && (
        <div className="weatherCard">
          <h2>{weatherData.name}</h2>
          <p>{(weatherData.main.temp - 273.15).toFixed(1)}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>{weatherData.weather[0].description}</p>
          <div className="emoji">{getWeatherEmoji(weatherData.weather[0].id)}</div>
          <div className="advice">
            <h3>Farmer Advice:</h3>
            <p>{getFarmerAdvice(weatherData.weather[0].id)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;






//next Four Days Weather forecast
//Alert System
//
//
//
//
//
//
//