import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './LeftPanel.module.css';

const center = [18.5204, 73.8567];

const LeftPanel = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const storedCoordinates = localStorage.getItem('coordinates');
    if (storedCoordinates) {
      console.log(JSON.parse(storedCoordinates));
      setLocations(JSON.parse(storedCoordinates));
    }
  }, [locations]);

  return (
    <div className={styles.leftPanel}>
      <MapContainer center={center} zoom={6} style={{ width: '100%', height: '20rem' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => (
          <Marker key={index} position={[location.lat, location.lon]}>
            <Popup>{`${location.lat}, ${location.lon}`}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LeftPanel;

// ---------------------------
