import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Today.module.css'; 
import { Star as StarIcon } from '@mui/icons-material';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

const Today = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(clear_icon); 
  const [coordinates, setCoordinates] = useState([]);
  
  useEffect(() => {
    const storedCoordinates = localStorage.getItem('coordinates');
    if (storedCoordinates) {
      console.log(JSON.parse(storedCoordinates))
      setCoordinates(JSON.parse(storedCoordinates));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=nashik&units=metric&appid=55dde7f2262dcf16d636e7dfa533a821`);
        setWeatherData(response.data);

        setWeatherIcon(getWeatherIcon(response.data.weather[0].icon));
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();

    
  }, []);

  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case '01d':
      case '01n':
        return clear_icon;
      case '02d':
      case '02n':
        return cloud_icon;
      case '03d':
      case '03n':
        return drizzle_icon;
      case '04d':
      case '04n':
        return drizzle_icon; 
      case '09n':
        return rain_icon;
      case '10d':
      case '10n':
        return rain_icon; 
      case '13d':
      case '13n':
        return snow_icon;
      default:
        return clear_icon; 
    }
  };

  // const handleStarClick = () => {
  //   if (weatherData) {
  //     const newCoordinates = [...coordinates, { lat: weatherData.coord.lat, lon: weatherData.coord.lon }];
  //     setCoordinates(newCoordinates);
  //     localStorage.setItem('coordinates', JSON.stringify(newCoordinates));
  //     setStarClicked(!starClicked); 
  //   }
  // };

  useEffect(() => {
    if (coordinates.length > 0) {
      localStorage.setItem('coordinates', JSON.stringify(coordinates));
    }
  }, [coordinates]);

  const handleStarClick = () => {
    if (weatherData) {
      const { lat, lon } = weatherData.coord;
      const placeName = weatherData.name; 
      const index = coordinates.findIndex(coord => coord.lat === lat && coord.lon === lon);
      if (index !== -1) {
        const newCoordinates = coordinates.filter((_, i) => i !== index);
        setCoordinates(newCoordinates);
      } else {
        const newCoordinates = [...coordinates, { lat, lon, placeName }];
        setCoordinates(newCoordinates);
      }
    }
  };


  return (
    <div className={styles.scrollableContainer}>
      <div className={styles.weatherContainer}>
        {weatherData && (
          <div className={styles.weatherCard}>
            <h2 className={styles.cityName}>{weatherData.name}</h2>
            <img src={weatherIcon} alt="Weather Icon" className={styles.weatherIcon} />
            <p className={styles.temperature}>{weatherData.main.temp} °C</p>
            <StarIcon onClick={handleStarClick} className={`${styles.starIcon} ${coordinates.some(coord => coord.lat === weatherData.coord.lat && coord.lon === weatherData.coord.lon) ? styles.golden : ''}`} />
          </div>
        )}

        <div className={styles.weatherCard}>
          {weatherData && (
            <>
              <h3>Temperature Details</h3>
              <p>Feels Like: {weatherData.main.feels_like}</p>
              <p>Min Temp: {weatherData.main.temp_min}</p>
              <p>Max Temp: {weatherData.main.temp_max}</p>
              <p>Pressure: {weatherData.main.pressure}</p>
              <p>Humidity: {weatherData.main.humidity}</p>
              <p>Sea Level: {weatherData.main.sea_level}</p>
              <p>Ground Level: {weatherData.main.grnd_level}</p>
            </>
          )}
        </div>

        <div className={styles.weatherCard}>
          {weatherData && (
            <>
              <h3>Wind Details</h3>
              <p>Visibility: {weatherData.visibility}</p>
              <p>Wind Speed: {weatherData.wind.speed}</p>
              <p>Wind Direction: {weatherData.wind.deg}</p>
              <p>Wind Gust: {weatherData.wind.gust}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Today;
