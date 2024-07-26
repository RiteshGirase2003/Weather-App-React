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
import sun from '../Assets/sun_rise_set.png'
import humidity_icon from '../Assets/humidity.png';
import directions from '../Assets/directions.png';
import clearbg from '../Assets/clearbg.jpeg';
import cloudbg from '../Assets/cloudbg.jpeg';
import rainbg from '../Assets/rainbg.jpeg';
import snowbg from '../Assets/snowbg.jpeg';
import wind_gif from '../Assets/wind.gif';
import eye from '../Assets/eyes1.gif';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import GrassIcon from '@mui/icons-material/Grass';
import WaterIcon from '@mui/icons-material/Water';
import AirIcon from '@mui/icons-material/Air';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CompressIcon from '@mui/icons-material/Compress';


const Today = ({place, coord}) => {
  
  const [weatherData, setWeatherData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(clear_icon); 
  const [BackgroundImage, setBackgroundImage] = useState(clearbg);
  const [coordinates, setCoordinates] = useState([]);
  const [queryStr, setQueryStr] = useState('');
  const unit = localStorage.getItem('selectedUnit');
  const lang = localStorage.getItem('selectedLanguage');
  useEffect(() => {
      let newQueryStr = '';
      
      if (lang) {
          newQueryStr += `&lang=${lang}`;
      }
      setQueryStr(newQueryStr);
  }, []);

  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

  if (place) {
      apiUrl += `q=${place}&`;
  } else if (coord.length > 0 ) {
      const { lat, lng } = coord;
      apiUrl += `lat=${lat}&lon=${lng}`;
  } else{
    apiUrl += `q=Maharashtra`;
  }

  apiUrl += `&units=metric${queryStr}&appid=55dde7f2262dcf16d636e7dfa533a821`;

  useEffect(() => {
    const storedCoordinates = localStorage.getItem('coordinates');
    if (storedCoordinates) {
      setCoordinates(JSON.parse(storedCoordinates));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=nashik&units=metric${queryStr}&appid=55dde7f2262dcf16d636e7dfa533a821`);
        const response = await axios.get(apiUrl);

        setWeatherData(response.data);
        const { weatherIcon, backgroundImage } = getWeatherIcon(response.data.weather[0].icon)
        setWeatherIcon(weatherIcon);
        setBackgroundImage(backgroundImage);
      
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();

  }, [place,coord]);

  const getWeatherIcon = (iconCode) => {
    let weatherIcon;
    let backgroundImage;

    switch (iconCode) {
        case '01d':
        case '01n':
            weatherIcon = clear_icon;
            backgroundImage = clearbg;
            break;
        case '02d':
        case '02n':
            weatherIcon = cloud_icon;
            backgroundImage = cloudbg;
            break;
        case '03d':
        case '03n':
        case '04d':
        case '04n':
            weatherIcon = drizzle_icon;
            backgroundImage = rainbg;
            break;
        case '09n':
        case '10d':
        case '10n':
            weatherIcon = rain_icon;
            backgroundImage = rainbg;
            break;
        case '13d':
        case '13n':
            weatherIcon = snow_icon;
            backgroundImage = snowbg;
            break;
        default:
            weatherIcon = clear_icon;
            backgroundImage = clearbg;
            break;
    }

    return { weatherIcon, backgroundImage };
  };

  

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

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    return hours + ':' + minutes.substr(-2);
  };


  return (
    <div className={styles.scrollableContainer}>

      {weatherData && ( <div className={styles.weatherContainer}  style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: 'cover' }}>
        
        {weatherData && (
          <div className={styles.weatherCardDetails}>
            <div className={styles.fav}>
              <StarIcon
                onClick={handleStarClick}
                className={`${styles.starIcon} ${coordinates.some(coord => coord.lat === weatherData.coord.lat && coord.lon === weatherData.coord.lon) ? styles.golden : ''}`}
              />
            </div>
            <h2 className={styles.cityName}>{weatherData.name}</h2>
            <img src={weatherIcon} alt="Weather Icon" className={styles.weatherIcon} />
            <p className={styles.temperature}>
              {weatherData ? (unit === 'metric' ? weatherData.main.temp + ' °C' : (weatherData.main.temp + 273.15) + ' K') : ''}
            </p>
            <h1>{weatherData.weather[0].main}</h1>
            <h3>{weatherData.weather[0].description}</h3>
            
          </div>
        )}
        <div className={styles.TempCardDetails}>
          {weatherData && (
            <>
              <h3>Weather Details in {weatherData.name}</h3>
              <div >

                <div className={styles.TempDetails}>
                  <div className={styles.cardDetails}>
                    <ThermostatIcon className={styles.thermostatIcon} />
                    <div className={styles.textContainer}>
                      <p className={styles.label}>Feels Like:</p>
                      <p className={styles.value}>
                        <strong>
                          {weatherData ? (unit === 'metric' ? weatherData.main.feels_like + ' °C' : (weatherData.main.feels_like + 273.15) + ' K') : ''}
                        </strong>
                      </p>
                    </div>
                  </div>

                  <div className={styles.SunDetails}>
                    <img src={sun} alt="Weather Icon" className={styles.sunImage} />
                    <div className={styles.sunTime}>
                      <div>{`[${formatTime(weatherData.sys.sunrise)}]`}</div>
                      <div>{`[${formatTime(weatherData.sys.sunset)}]`}</div>
                    </div>

                  </div>

                </div>

                <div className={styles.cardsContainer}>
                  <div className={styles.card}>
                    <p className={styles.label}>Min Temp:</p>
                    <AcUnitIcon className={styles.acUnitIcon} />
                    <p className={styles.value}>
                      <strong>{weatherData ? (unit === 'metric' ? weatherData.main.temp_min + ' °C' : (weatherData.main.temp_min + 273.15) + ' K') : ''}</strong>
                    </p>
                  </div>
                  <div className={styles.card}>
                    <p className={styles.label}>Max Temp:</p>
                    <ThermostatIcon className={styles.thermostatIcon} />
                    <p className={styles.value}>
                      <strong>{weatherData ? (unit === 'metric' ? weatherData.main.temp_max + ' °C' : (weatherData.main.temp_max + 273.15) + ' K') : ''}</strong>
                    </p>
                  </div>
                  <div className={styles.card}>
                    <p className={styles.label}>Pressure:</p>
                    <CompressIcon className={styles.airIcon} />
                    <p className={styles.value}>
                      <strong>{weatherData.main.pressure}</strong> hPa
                    </p>
                  </div>
                  <div className={styles.card}>
                    <p className={styles.label}>Humidity:</p>
                    <AirIcon className={styles.airIcon} />
                    <p className={styles.value}>
                      <strong>{weatherData.main.humidity}</strong> %
                    </p>
                  </div>
                  <div className={styles.card}>
                    <p className={styles.label}>Sea Level:</p>
                    <WaterIcon className={styles.waterIcon} />
                    <p className={styles.value}>
                      <strong>{weatherData.main.sea_level}</strong> meters
                    </p>
                  </div>
                  <div className={styles.card}>
                    <p className={styles.label}>Ground Level:</p>
                    <GrassIcon className={styles.grassIcon} />
                    <p className={styles.value}>
                      <strong>{weatherData.main.grnd_level}</strong> meters
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className={styles.windCardDetails}>
          {weatherData && (
            <>
              <h3>Wind Details</h3>
              <div className={styles.windcard1}>
                <div className={styles.card}>
                  {/* <AirIcon className={styles.icon} /> */}
                  <img src={wind_gif} alt="Weather Icon" className={styles.image} />

                  <p>Speed: <strong>{weatherData.wind.speed}</strong> m/s</p>
                </div>
                <div className={styles.card}>
                  <img src={wind_gif} alt="Weather Icon" className={styles.image} />
                  <p>Gust: <strong>{weatherData.wind.gust}</strong> m/s</p>
                </div>
              </div>
            
              <div className={styles.windcard2}>
                <div className={styles.card}>
                  <img src={eye} alt="Weather Icon" className={styles.image} />
                  <p>Visibility: <strong>{weatherData.visibility}</strong> m</p>
                </div>
                <div className={styles.card}>
                  {/* <NorthIcon className={styles.icon} style={{ transform: `rotate(${weatherData.wind.deg}deg)` }} /> */}
                  <div className={styles.directionImageContainer}>
                    <img src={directions} alt="Weather Icon" className={styles.image} />
                    <PanToolAltIcon className={styles.icon} style={{ transform: `rotate(${weatherData.wind.deg}deg)`, transformOrigin: 'bottom center' }} />
                  </div>
                  <p>Direction: <strong>{weatherData.wind.deg}</strong>°</p>
                </div>
              </div>
            </>
          )}
        </div>      
      </div>)}
    </div>
  );
};

export default Today;
