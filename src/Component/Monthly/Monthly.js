import React, { useState } from 'react';
import styles from './Monthly.module.css';
import data from '../Constant/monthlyData.json';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import sun from '../Assets/sun_rise_set.png';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import GrassIcon from '@mui/icons-material/Grass';
import WaterIcon from '@mui/icons-material/Water';
import AirIcon from '@mui/icons-material/Air';
import CompressIcon from '@mui/icons-material/Compress';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import InfoIcon from '@mui/icons-material/Info';


const Monthly = () => {
  const [showMoreDetails, setShowMoreDetails] = useState(false)
  const [showStatistics, setShowStatistics] = useState(false)
  const today = new Date().toLocaleString('en-us', { weekday: 'long' });
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
      case '04d':
      case '04n':
        return drizzle_icon;
      case '09n':
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

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();
    return hours + ':' + minutes.substr(-2);
  };

  return (
    <div className={styles.scrollableContainer}>
      <h1 style={{marginLeft:'20px'}}>{data[0].name}

        <Popup trigger={<button> <InfoIcon sx={{color:'#26A6E0'}}/> </button>} position="right center">
          <div>This is Static Data...!</div>
        </Popup>
      </h1>

      <div className={styles.container}>
      
        {data.map((weatherData, index) => (
          <div
            key={index}
            className={`${styles.card} ${weatherData.day === today ? styles.todayCard : ''}`}
          >
            <img
              src={getWeatherIcon(weatherData.weather[0].icon)}
              alt="Weather Icon"
              className={styles.icon}
            />
            <p style={{fontSize:'2rem'}}>{weatherData.main.temp} °C</p>
            <p>{weatherData.date}</p>
          </div>
        ))}
      </div>
      { showMoreDetails &&
        <div >
          {data.map((weatherData,index) => (
            <div className={styles.TempCardDetails}>
              {weatherData && (
                <div style={{border:'1px solid #cdcdcd',borderRadius:'8px',padding:"0.5rem"}}>
                  <h1>{weatherData.day}</h1>
                  <div className={styles.firstCard}>
                    
                    <div className={styles.leftSection}>
                      <div >
                        <h3><span style={{fontSize:'3rem'}}>{weatherData.main.temp}</span> °C</h3>
                      </div>
                      <div >
                        <h2>{weatherData.weather[0].main}</h2>
                        <h4>{weatherData.weather[0].description}</h4>
                      </div>
                    </div>
                    <div className={styles.rightSection}>
                      <img src={getWeatherIcon(weatherData.weather[0].icon)} alt="Weather Icon" />
                    </div>
                  </div>
                  
                  <div className={styles.cardsContainer}>

                    <div className={styles.card}>
                      <p className={styles.label}>Feels Like</p>
                      <ThermostatIcon className={styles.thermostatIcon} />
                      <p className={styles.value}>
                        <strong>{weatherData.main.feels_like} °C</strong>
                      </p>
                    </div>


                    <div className={styles.card}>
                      <img src={sun} alt="Sun Icon" className={styles.sunImage} />
                      <div className={styles.sunTime}>
                        <div><strong>{`[${formatTime(weatherData.sys.sunrise)}]`}</strong></div>
                        <div><strong>{`[${formatTime(weatherData.sys.sunset)}]`}</strong></div>
                      </div>
                    </div>


                    <div className={styles.card}>
                      <p className={styles.label}>Min Temp:</p>
                      <AcUnitIcon className={styles.acUnitIcon} />
                      <p className={styles.value}>
                        <strong>{weatherData.main.temp_min} °C</strong>
                      </p>
                    </div>
                    <div className={styles.card}>
                      <p className={styles.label}>Max Temp:</p>
                      <ThermostatIcon className={styles.thermostatIcon} />
                      <p className={styles.value}>
                        <strong>{weatherData.main.temp_max} °C</strong>
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
                    <div className={styles.card}>              
                      <p className={styles.label}>Wind Speed:</p>
                        <AirIcon className={styles.airIcon} />

                      <p className={styles.value}>
                        <strong>{weatherData.wind.speed} m/s</strong>
                      </p>
                    </div>
                    <div className={styles.card}>
                      <p className={styles.label}>Wind Direction:</p>
                      <PanToolAltIcon className={styles.icon} style={{ transform: `rotate(${weatherData.wind.deg}deg)` }} />
                      <p className={styles.value}>
                        <strong>{weatherData.wind.deg}°</strong>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      }
      <div className={styles.ToggleBtnDiv}>
      <button className={styles.ToggleBtn} onClick={()=>{setShowMoreDetails(!showMoreDetails)}}>
        {showMoreDetails ? 'Hide Details' : 'Show More Details'}
      </button>
      </div>

      { showStatistics && (
        <div className={styles.StatsDiv}>
          <div className={styles.ChartContainer}>
            <h2>Temperature</h2>
            <LineChart width={800} height={300} data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="main.temp" stroke="#8884d8" name="Temperature" />
            </LineChart>
          </div>

          <div className={styles.ChartContainer}>
            <h2>Humidity</h2>
            <LineChart width={800} height={300} data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="main.humidity" stroke="#82ca9d" name='Humidity' />
            </LineChart>
          </div>

          <div className={styles.ChartContainer}>
            <h2>Pressure</h2>
            <LineChart width={800} height={300} data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="main.pressure" stroke="#ffc658" name='Pressure'/>
            </LineChart>
          </div>

          <div className={styles.ChartContainer}>
            <h2>Wind Speed</h2>
            <LineChart width={800} height={300} data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="wind.speed" stroke="#ff7300" name='Wind Speed'/>
            </LineChart>
          </div>

          <div className={styles.ChartContainer}>
            <h2>Visibility</h2>
            <LineChart width={800} height={300} data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="visibility" stroke="#0088fe" name='Visibility'/>
            </LineChart>
          </div>
        </div>
      )}
      
      <div className={styles.ToggleBtnDiv}>
        <button className={styles.ToggleBtn} onClick={()=>{setShowStatistics(!showStatistics)}}>
          {showStatistics ? 'Hide Stats' : 'Show Monthly Statistics'}
        </button>
      </div>
    </div>
  );
};

export default Monthly;
