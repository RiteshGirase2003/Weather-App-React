import React from 'react';
import './App.css';
import Header from './Component/Header/Header';
import RightPanel from './Component/LeftPanel/LeftPanel';
import NavBar from './Component/NavBar/NavBar';


function App() {
  return (
    <div >
      <Header/>
      <>
        <RightPanel/>
        <NavBar/>
      </>
    </div>
  );
}

export default App;
