// File: src/App.js
import React, { useState } from 'react';
import Modal from './components/Modal';
import WeatherDashboard from './components/WeatherDashboard';
import './App.css'; // Custom styles

const App = () => {
  const [locationPermission, setLocationPermission] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const handleAllowLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setLocationPermission(true);
        },
        (error) => {
          alert('Failed to get location. Please enter it manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleEnterLocationManually = async (location) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=9742ddfbe04e917ce9eabb32d1aba465`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        setUserLocation({
          lat: data[0].lat,
          lon: data[0].lon,
        });
        setLocationPermission(true);
      } else {
        alert('Location not found. Please try again.');
      }
    } catch (error) {
      alert('Error fetching location. Please try again later.');
    }
  };

  return (
    <div className="app-container">
      {!locationPermission ? (
        <Modal
          onAllowLocation={handleAllowLocation}
          onEnterLocationManually={(location) => {
            const userInput = prompt('Enter your location manually:');
            if (userInput) handleEnterLocationManually(userInput);
          }}
        />
      ) : (
        <WeatherDashboard userLocation={userLocation} />
      )}
    </div>
  );
};

export default App;