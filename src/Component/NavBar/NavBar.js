import React, { useState } from 'react';
import Today from '../Today/Today';
import Weekly from '../Weekly/Weekly';
import Monthly from '../Monthly/Monthly';
import styles from './NavBar.module.css';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('today');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        {/* <button onClick={() => handleTabChange('today')}>Today</button>
        <button onClick={() => handleTabChange('weekly')}>Weekly</button>
        <button onClick={() => handleTabChange('monthly')}>Monthly</button> */}

        <button onClick={() => handleTabChange('today')} className={activeTab === 'today' ? `${styles.tab} ${styles.active}` : styles.tab}>
            Today
        </button>
        <button onClick={() => handleTabChange('weekly')} className={activeTab === 'weekly' ? `${styles.tab} ${styles.active}` : styles.tab}>
            Weekly
        </button>
        <button onClick={() => handleTabChange('monthly')} className={activeTab === 'monthly' ? `${styles.tab} ${styles.active}` : styles.tab}>
            Monthly
        </button>
      </div>

      {activeTab === 'today' && <Today />}
      {activeTab === 'weekly' && <Weekly />}
      {activeTab === 'monthly' && <Monthly />}
    </div>
  );
};

export default Navbar;
