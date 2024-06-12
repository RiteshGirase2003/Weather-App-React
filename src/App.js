import React from 'react';
import './App.css';
import Header from './Component/Header/Header';
import NavBar from './Component/NavBar/NavBar';
import LeftPanel from './Component/LeftPanel/LeftPanel';


function App() {
  return (
    <div >
      <Header/>
      <>
        <LeftPanel/>
        <NavBar/>
      </>
    </div>
  );
}

export default App;
