    // UseGlobeSearch.js
    import React, { useState } from 'react';
    import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
    import 'leaflet/dist/leaflet.css';
    import L from 'leaflet';
    import styles from './UseGlobeSearch.module.css';

    // To fix missing marker icons in Create React App projects
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-shadow.png',
    });

    const UseGlobeSearch = ({ onClose }) => {
    const [position, setPosition] = useState(null);

    const LocationMarker = () => {
        useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
        });

        return position === null ? null : <Marker position={position}></Marker>;
    };

    return (
        <div className={styles.overlay}>
        <div className={styles.overlayContent}>
            <button className={styles.closeBtn} onClick={onClose}>
            &times;
            </button>
            <MapContainer center={[19.7515, 75.7139]} zoom={5} style={{marginTop:'2rem', height: '400px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
            </MapContainer>
        </div>
        </div>
    );
    };

    export default UseGlobeSearch;
