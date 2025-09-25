// WeatherApp.jsx
import React, { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import ThermostatAutoIcon from "@mui/icons-material/ThermostatAuto";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import ElectricBorder from "../components/div";
import SplitText from "../components/texteffect";

const WeatherApp = ({ defaultCity = "Bangalore", apiKey }) => {
  const [city, setCity] = useState(defaultCity);
  const [weatherData, setWeatherData] = useState(null);
  const [inputCity, setInputCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();

        if (data.cod !== 200) {
          setError(data.message || "City not found");
          setWeatherData(null);
        } else if (data.main && data.weather) {
          setWeatherData({
            city: data.name,
            temp: data.main.temp,
            description: data.weather[0].description,
          });
        } else {
          setError("Weather data not available");
          setWeatherData(null);
        }
      } catch (err) {
        setError("Failed to fetch weather data: " + err);
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, apiKey]);

  const handleFetch = () => {
    if (inputCity.trim()) {
      setCity(inputCity);
      setInputCity("");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center gap-8 p-8">
      <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 text-center">
        Weather App 🌦️
      </h1>

      {/* Input + Button */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
        <input
          type="text"
          placeholder="Enter City"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          className="w-full px-3 py-2 rounded border-2 border-cyan-400 bg-black text-white placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <button
          onClick={handleFetch}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition"
        >
          <ThermostatIcon /> Get Weather
        </button>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="w-72 mx-auto space-y-2">
          <Skeleton height={40} />
          <Skeleton animation="wave" height={30} />
          <Skeleton animation={false} height={30} />
        </div>
      )}

      {/* Error */}
      {error && <p className="text-red-500 font-bold text-center">{error}</p>}

      {/* Weather Card */}
      {weatherData && (
        <ElectricBorder
          color="#7df9ff"
          speed={1}
          chaos={0.5}
          thickness={2}
          style={{ borderRadius: "16px" }}
        >
          <div className="bg-gray-900 max-w-xs sm:max-w-sm p-6 mx-auto flex flex-col items-center gap-4 rounded-lg">
            <SplitText
              text={weatherData.city}
                            className="text-4xl font-bold text-center"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              onLetterAnimationComplete={handleAnimationComplete}
            />

            <h3 className="flex items-center gap-2 text-cyan-400 text-lg sm:text-xl">
              <ThermostatAutoIcon />
              Temperature: {weatherData.temp}°C
            </h3>
            <h3 className="text-cyan-400 text-lg sm:text-xl">
              Condition: {weatherData.description}
            </h3>
          </div>
        </ElectricBorder>
      )}
    </div>
  );
};

export default WeatherApp;
