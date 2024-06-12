// // LeftPanel.js

// import React from 'react';
// import styles from './LeftPanel.module.css';

// const LeftPanel = () => {
//   return (
//     <div className={styles.leftPanel}>
      
//     </div>
//   );
// };

// export default LeftPanel;

// ==================

import React, { useState } from 'react';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './LeftPanel.module.css';

const center = [18.5204, 73.8567]; 

const locations = [
  { position: [18.5204, 73.8567], name: 'Pune' },
  { position: [19.9975, 73.7898], name: 'Nashik' },
  { position: [21.1466, 79.0882], name: 'Nagpur' },
];

const LeftPanel = () => {
  return (
    <div className={styles.leftPanel}>
      <MapContainer center={center} zoom={6} style={{ width: '100%', height: '20rem' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => (
          <Marker key={index} position={location.position}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LeftPanel;
