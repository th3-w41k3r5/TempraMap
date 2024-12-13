// File: src/components/WeatherDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WeatherDashboard.css';

const WeatherDashboard = ({ userLocation }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [aqiData, setAqiData] = useState(null);
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  useEffect(() => {
    if (userLocation) {
      const fetchWeatherData = async () => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather`,
            {
              params: {
                lat: userLocation.lat,
                lon: userLocation.lon,
                units: 'metric',
                appid: '9742ddfbe04e917ce9eabb32d1aba465',
              },
            }
          );
          setWeatherData(response.data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };

      const fetchAqiData = async () => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/air_pollution`,
            {
              params: {
                lat: userLocation.lat,
                lon: userLocation.lon,
                appid: '9742ddfbe04e917ce9eabb32d1aba465',
              },
            }
          );
          setAqiData(response.data.list[0]);
        } catch (error) {
          console.error('Error fetching AQI data:', error);
        }
      };

      fetchWeatherData();
      fetchAqiData();
    }
  }, [userLocation]);

  if (!weatherData) return <p>Loading weather data...</p>;

  const { main, wind, weather, sys, name } = weatherData;
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  return (
    <div className="weather-dashboard">
      <div className="header">
        <h1>Current Weather</h1>
        <p>{name}, {date}</p>
      </div>
      <div className="main-weather">
        <div className="temperature">
          <h2>{Math.round(main.temp)}°C</h2>
          <p>RealFeel® {Math.round(main.feels_like)}°C</p>
        </div>
        <div className="weather-icon">
          <img
            src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`}
            alt="weather icon"
          />
          <p>{weather[0].description}</p>
        </div>
      </div>
      <div className="details">
        <div className="detail-item">
          <p>Wind</p>
          <p>{wind.speed} km/h</p>
        </div>
        <div className="detail-item">
          <p>Wind Gusts</p>
          <p>{wind.gust ? `${wind.gust} km/h` : 'N/A'}</p>
        </div>
        <div className="detail-item">
          <p>Air Quality</p>
          <p>{aqiData ? `AQI ${aqiData.main.aqi}` : 'Loading...'}</p>
        </div>
      </div>
      <button
        className="btn btn-info"
        onClick={() => setShowMoreDetails((prev) => !prev)}
      >
        {showMoreDetails ? 'Hide Details' : 'Load More Weather Details'}
      </button>
      {showMoreDetails && (
        <div className="additional-details">
          <p>Humidity: {main.humidity}%</p>
          <p>Pressure: {main.pressure} hPa</p>
          <p>Sunrise: {new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p>Sunset: {new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
