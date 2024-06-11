// // Header.js

// import React from 'react';
// import styles from './Header.module.css';

// const Header = () => {
//   return (
//     <header className={styles.header}>
//       {/* <img src="/path/to/your/logo.png" alt="Logo" className={styles.logo} /> */}
//       <h1 className={styles.logo}>Weather App</h1>

//       <div className={styles.searchContainer}>
//         <input type="text" placeholder="Search..." className={styles.searchInput} />
//         <button className={styles.actionBtn}>Search</button>
//       </div>

//       <div>
//         <span>IN/C</span>
//       </div>
//     </header>
//   );
// };

// export default Header;


// Header.js

import React, { useState } from 'react';
import styles from './Header.module.css';

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

const Header = () => {
  const [selectedUnit, setSelectedUnit] = useState('metric'); 
  const [selectedLanguage, setSelectedLanguage] = useState('en'); 

  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <header className={styles.header}>
      {/* <img src="/path/to/your/logo.png" alt="Logo" className={styles.logo} /> */}
      <h1 className={styles.logo}>Weather App</h1>

      <div className={styles.searchContainer}>
        <input type="text" placeholder="Search..." className={styles.searchInput} />
        <button className={styles.actionBtn}>Search</button>
      </div>

      <div>
        <span>{selectedUnit === 'metric' ? 'IN/C' : 'IN/F'}</span> {/* Display selected unit */}
        <select value={selectedUnit} onChange={handleUnitChange} className={styles.unitSelect}>
          <option value="standard">Standard</option>
          <option value="metric">Metric</option>
          <option value="imperial">Imperial</option>
        </select>

        <select value={selectedLanguage} onChange={handleLanguageChange} className={styles.languageSelect}>
          {languageOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </header>
  );
};

export default Header;
