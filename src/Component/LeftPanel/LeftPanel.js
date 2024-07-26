import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './LeftPanel.module.css';
import PushPinIcon from '@mui/icons-material/PushPin';
import L from 'leaflet';


const center = [18.5204, 73.8567];
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
iconRetinaUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon-2x.png',
iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
shadowUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-shadow.png',
});

const LeftPanel = ({setPlace}) => {
  const [locations, setLocations] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    const storedCoordinates = localStorage.getItem('coordinates');
    if (storedCoordinates) {
      setLocations(JSON.parse(storedCoordinates));
    }
  }, []); 

  const handleSearchPlace = (place) => {
    setIsClicked(prevIsClicked => !prevIsClicked);
    if (!isClicked) {
      setPlace(place);
    }
  }
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

      <div className={styles.locationList}>
          {locations.map((location, index) => (
            <div key={index} className={styles.card} onClick={() => handleSearchPlace(location.placeName)}>
              <p ><PushPinIcon />{location.placeName}</p>
            </div>
          ))}
        </div>
    </div>
  );
};

export default LeftPanel;
