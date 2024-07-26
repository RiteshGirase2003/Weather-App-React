import React, { useState } from 'react';
import './App.css';
import Header from './Component/Header/Header';
import NavBar from './Component/NavBar/NavBar';
import LeftPanel from './Component/LeftPanel/LeftPanel';


function App() {
  const [place, setPlace]  = useState('')
  const [coord, setCoord] = useState([])

  return (
    <div >
      <Header setPlace={setPlace} setCoord={setCoord}/>
      <>
        <div className="leftpanel"><LeftPanel setPlace={setPlace}/> </div>
        
        <NavBar place={place} coord={coord}/>
      </>
    </div>
  );
}

export default App;
