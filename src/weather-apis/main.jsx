// WeatherApp.jsx
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import ThermostatAutoIcon from "@mui/icons-material/ThermostatAuto";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import Box from "@mui/material/Box";
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
    <div style={{ padding: 20, backgroundColor: "#000", minHeight: "100vh", color: "#fff",  display:"flex", alignItems:"center", flexDirection:"column", gap:"30px"}}>
      <h1 style={{ fontWeight: "bold", fontSize: "2.5rem", textAlign: "center" }}>
        Weather App 🌦️
      </h1>

      <Stack direction="row" spacing={1} sx={{ justifyContent: "center", mb: 3 }}>
        <TextField
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          id="outlined-basic"
          label="Enter City"
          variant="outlined"
          size="small"
          color="success"
          sx={{
            margin:"10px",
            input: { color: "#fff" },
            label: { color: "#fff" },
            fieldset: { borderColor: "#7df9ff" },
            "&:hover fieldset": { borderColor: "#00e5ff" },
          }}
        />

        <Button
          startIcon={<ThermostatIcon />}
          size="small"
          variant="contained"
          color="success"
          onClick={handleFetch}
        >
          Get Weather
        </Button>
      </Stack>

      {loading && (
        <Box sx={{ width: 300, margin: "0 auto" }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      )}

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {weatherData && (
        <ElectricBorder
          color="#7df9ff"
          speed={1}
          chaos={0.5}
          thickness={2}
          style={{
            borderRadius: 16,
            maxWidth: 350,
            margin: "20px auto",
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#111", // dark box inside black bg
          }}
        >
          <SplitText
            text={weatherData.city}
            className="text-6xl font-bold text-center"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
          />

          <h3 style={{ marginTop: 15, color: "#7df9ff" }}>
            <ThermostatAutoIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            Temperature: {weatherData.temp}°C
          </h3>
          <h3 style={{ color: "#7df9ff" }}>Condition: {weatherData.description}</h3>
        </ElectricBorder>
      )}
    </div>
  );
};

export default WeatherApp;
