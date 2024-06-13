
// // Header.js
// import React, { useState, useEffect } from 'react';
// import PublicIcon from '@mui/icons-material/Public';
// import UseGlobeSearch from '../UseGlobeSearch/UseGlobeSearch';
// import SearchIcon from '@mui/icons-material/Search';
// import styles from './Header.module.css';

// const Header = () => {
//   const initialUnit = localStorage.getItem('selectedUnit') || 'metric';
//   const initialLanguage = localStorage.getItem('selectedLanguage') || 'en';

//   const [selectedUnit, setSelectedUnit] = useState(initialUnit);
//   const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);

//   const [showOverlay, setShowOverlay] = useState(false);

//   useEffect(() => {
//     localStorage.setItem('selectedLanguage', selectedLanguage);
//   }, [selectedLanguage]);

//   useEffect(() => {
//     localStorage.setItem('selectedUnit', selectedUnit);
//   }, [selectedUnit]);

//   const languageOptions = [
//     { value: 'sq', label: 'Albanian' },
//     { value: 'af', label: 'Afrikaans' },
//     { value: 'ar', label: 'Arabic' },
//     { value: 'az', label: 'Azerbaijani' },
//     { value: 'eu', label: 'Basque' },
//     { value: 'be', label: 'Belarusian' },
//     { value: 'bg', label: 'Bulgarian' },
//     { value: 'ca', label: 'Catalan' },
//     { value: 'zh_cn', label: 'Chinese Simplified' },
//     { value: 'zh_tw', label: 'Chinese Traditional' },
//     { value: 'hr', label: 'Croatian' },
//     { value: 'cz', label: 'Czech' },
//     { value: 'da', label: 'Danish' },
//     { value: 'nl', label: 'Dutch' },
//     { value: 'en', label: 'English' },
//     { value: 'fi', label: 'Finnish' },
//     { value: 'fr', label: 'French' },
//     { value: 'gl', label: 'Galician' },
//     { value: 'de', label: 'German' },
//     { value: 'el', label: 'Greek' },
//     { value: 'he', label: 'Hebrew' },
//     { value: 'hi', label: 'Hindi' },
//     { value: 'hu', label: 'Hungarian' },
//     { value: 'is', label: 'Icelandic' },
//     { value: 'id', label: 'Indonesian' },
//     { value: 'it', label: 'Italian' },
//     { value: 'ja', label: 'Japanese' },
//     { value: 'kr', label: 'Korean' },
//     { value: 'ku', label: 'Kurmanji (Kurdish)' },
//     { value: 'la', label: 'Latvian' },
//     { value: 'lt', label: 'Lithuanian' },
//     { value: 'mk', label: 'Macedonian' },
//     { value: 'no', label: 'Norwegian' },
//     { value: 'fa', label: 'Persian (Farsi)' },
//     { value: 'pl', label: 'Polish' },
//     { value: 'pt', label: 'Portuguese' },
//     { value: 'pt_br', label: 'Português Brasil' },
//     { value: 'ro', label: 'Romanian' },
//     { value: 'ru', label: 'Russian' },
//     { value: 'sr', label: 'Serbian' },
//     { value: 'sk', label: 'Slovak' },
//     { value: 'sl', label: 'Slovenian' },
//     { value: 'es', label: 'Spanish' },
//     { value: 'sv', label: 'Swedish' },
//     { value: 'th', label: 'Thai' },
//     { value: 'tr', label: 'Turkish' },
//     { value: 'ua', label: 'Ukrainian' },
//     { value: 'vi', label: 'Vietnamese' },
//     { value: 'zu', label: 'Zulu' },
//   ];


//   const handleUnitChange = (event) => {
//     setSelectedUnit(event.target.value);
//   };

//   const handleLanguageChange = (event) => {
//     setSelectedLanguage(event.target.value);
//   };

//   const handleIconClick = () => {
//     setShowOverlay(true);
//   };

//   const handleCloseOverlay = () => {
//     setShowOverlay(false);
//   };

//   return (
    // <header className={styles.header}>
    //   <h1 className={styles.logo}>Weather App</h1>

    //   <div className={styles.searchContainer}>
        
    //     <div className={styles.searchBar}>
    //       <input type="text" placeholder="Search..." className={styles.searchInput} />
    //       <SearchIcon className={styles.searchIcon} />
    //     </div>
    //       <PublicIcon className={styles.icon} onClick={handleIconClick} />
    //   </div>

    //   <div>
    //     <span>{`${selectedLanguage.toUpperCase()}/${selectedUnit === 'metric' ? '°C' : 'K'}`}</span>

    //     <select value={selectedUnit} onChange={handleUnitChange} className={styles.unitSelect}>
    //       <option value="standard">Standard</option>
    //       <option value="metric">Metric</option>
    //     </select>

    //     <select value={selectedLanguage} onChange={handleLanguageChange} className={styles.languageSelect}>
    //       {languageOptions.map((option) => (
    //         <option key={option.value} value={option.value}>{option.label}</option>
    //       ))}
    //     </select>

    //   </div>

//       {showOverlay && <UseGlobeSearch onClose={handleCloseOverlay} />}
//     </header>
//   );
// };

// export default Header;



// -------


// Header.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import PublicIcon from '@mui/icons-material/Public';
import SearchIcon from '@mui/icons-material/Search';
import styles from './Header.module.css';
import L from 'leaflet';
import VoiceSearch from './VoiceSearch';
import logo from '../Assets/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Header = ({setPlace,setCoord}) => {
  const initialUnit = localStorage.getItem('selectedUnit') || 'metric';
  const initialLanguage = localStorage.getItem('selectedLanguage') || 'en';
  const [zoom , setZoom] = useState(5)
  const [selectedUnit, setSelectedUnit] = useState(initialUnit);
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
  const [showOverlay, setShowOverlay] = useState(false);
  const [position, setPosition] = useState([19.7515, 75.7139]);
  const [searchPlace, setSearchPlace] = useState('Maharashtra');
  const [currSearchMode, setCurrSearchMode] = useState('input')
  const [showMetricOverlay, setShowMetricOverlay] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleInputChange = (event) => {
    setSearchPlace(event.target.value);
    setCurrSearchMode('input')
  };
  

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);

  const languageOptions = [
    { value: 'sq', label: 'Albanian' },
    { value: 'af', label: 'Afrikaans' },
    { value: 'ar', label: 'Arabic' },
    { value: 'az', label: 'Azerbaijani' },
    { value: 'eu', label: 'Basque' },
    { value: 'be', label: 'Belarusian' },
    { value: 'bg', label: 'Bulgarian' },
    { value: 'ca', label: 'Catalan' },
    { value: 'zh_cn', label: 'Chinese Simplified' },
    { value: 'zh_tw', label: 'Chinese Traditional' },
    { value: 'hr', label: 'Croatian' },
    { value: 'cz', label: 'Czech' },
    { value: 'da', label: 'Danish' },
    { value: 'nl', label: 'Dutch' },
    { value: 'en', label: 'English' },
    { value: 'fi', label: 'Finnish' },
    { value: 'fr', label: 'French' },
    { value: 'gl', label: 'Galician' },
    { value: 'de', label: 'German' },
    { value: 'el', label: 'Greek' },
    { value: 'he', label: 'Hebrew' },
    { value: 'hi', label: 'Hindi' },
    { value: 'hu', label: 'Hungarian' },
    { value: 'is', label: 'Icelandic' },
    { value: 'id', label: 'Indonesian' },
    { value: 'it', label: 'Italian' },
    { value: 'ja', label: 'Japanese' },
    { value: 'kr', label: 'Korean' },
    { value: 'ku', label: 'Kurmanji (Kurdish)' },
    { value: 'la', label: 'Latvian' },
    { value: 'lt', label: 'Lithuanian' },
    { value: 'mk', label: 'Macedonian' },
    { value: 'no', label: 'Norwegian' },
    { value: 'fa', label: 'Persian (Farsi)' },
    { value: 'pl', label: 'Polish' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'pt_br', label: 'Português Brasil' },
    { value: 'ro', label: 'Romanian' },
    { value: 'ru', label: 'Russian' },
    { value: 'sr', label: 'Serbian' },
    { value: 'sk', label: 'Slovak' },
    { value: 'sl', label: 'Slovenian' },
    { value: 'es', label: 'Spanish' },
    { value: 'sv', label: 'Swedish' },
    { value: 'th', label: 'Thai' },
    { value: 'tr', label: 'Turkish' },
    { value: 'ua', label: 'Ukrainian' },
    { value: 'vi', label: 'Vietnamese' },
    { value: 'zu', label: 'Zulu' },
  ];

  const toggleOverlay = () => {
    setShowMetricOverlay(!showMetricOverlay);
  };

  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
    localStorage.setItem('selectedUnit', event.target.value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    localStorage.setItem('selectedLanguage', event.target.value);
  };

  const handleIconClick = () => {
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-shadow.png',
  });

  const handleSearchClick = () => {
    if (currSearchMode === 'input') {
      setPlace(searchPlace);
      setCoord([]);

    } else if (currSearchMode === 'globe') {
      setPlace('');
      setCoord(position);
    }
  };


  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        console.log(e.latlng)
        setPosition(e.latlng);
        setCurrSearchMode('globe')
        setShowOverlay(false);
        handleSearchClick()
      },
    });

    return position === null ? null : <Marker position={position}></Marker>;
  };

  const handleSearch = (query) => {
    setSearchPlace(query);
    setPlace(query);
    setCoord([]);
  };


  return (
    <header className={styles.header}>
      {/* <h1 className={styles.logo}>Weather App</h1> */}
      <img src={logo} alt="Logo Icon" className={styles.logo} />

      <div className={styles.searchContainer}>
        
        <div className={styles.searchBar}>
          <input type="text" placeholder="Search..." className={styles.searchInput} value={searchPlace} onChange={handleInputChange} />
          <VoiceSearch className={styles.voiceSearch} onSearch={handleSearch} />
          <SearchIcon className={styles.searchIcon} onClick={() => { setCurrSearchMode('input'); handleSearchClick(); }}/>
        </div>
          <PublicIcon className={styles.icon} onClick={handleIconClick} />
      </div>

      {/* <div>
        <span>{`${selectedLanguage.toUpperCase()}/${selectedUnit === 'metric' ? '°C' : 'K'}`}</span>

        <select value={selectedUnit} onChange={handleUnitChange} className={styles.unitSelect}>
          <option value="standard">Standard</option>
          <option value="metric">Metric</option>
        </select>

        <select value={selectedLanguage} onChange={handleLanguageChange} className={styles.languageSelect}>
          {languageOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>

      </div> */}

<div className={windowWidth <= 750 ? styles.overlayContainer : null}>
      {window.innerWidth <= 750 ? (
        <MenuIcon onClick={toggleOverlay} className={styles.menuIcon} />
      ) : (
        <div>
          <span>{`${selectedLanguage.toUpperCase()}/${selectedUnit === 'metric' ? '°C' : 'K'}`}</span>
          <select
            value={selectedUnit}
            onChange={handleUnitChange}
            className={styles.unitSelect}
          >
            <option value="standard">Standard</option>
            <option value="metric">Metric</option>
          </select>
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className={styles.languageSelect}
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      )}
      {showMetricOverlay && (
        <div className={styles.overlay}>
          <CloseIcon onClick={toggleOverlay} className={styles.closeIcon} />
          <span>{`${selectedLanguage.toUpperCase()}/${selectedUnit === 'metric' ? '°C' : 'K'}`}</span>
          <select
            value={selectedUnit}
            onChange={handleUnitChange}
            className={styles.unitSelect}
          >
            <option value="standard">Standard</option>
            <option value="metric">Metric</option>
          </select>
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className={styles.languageSelect}
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      )}
    </div>

      {showOverlay && (
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <button className={styles.closeBtn} onClick={handleCloseOverlay}>
              &times;
            </button>
            <MapContainer center={position} zoom={zoom} style={{ marginTop: '2rem', height: '400px', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationMarker />
            </MapContainer>

          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
