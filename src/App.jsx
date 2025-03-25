import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route } from "react-router-dom";
import Deck from './pages/Deck.tsx';
import Home from './pages/Home';
import Load from './pages/Load.tsx';
import New from './pages/New.tsx';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App(){
  const [showHome, setShowHome] = useState(true);
  const [showLoad, setShowLoad] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showBackHome, setShowBackHome] = useState(false);
  
  function handleLoadDeck(){
    setShowHome(false);
    setShowLoad(true);
    setShowNew(false);
    setShowBackHome(true);
  }
  function handleNewDeck(){
    setShowHome(false);
    setShowLoad(false);
    setShowNew(true);
    setShowBackHome(true);
  }
  function handleBackHome(){
    setShowHome(true);
    setShowLoad(false);
    setShowNew(false);
    setShowBackHome(false);
  }
  return ( 
    <BrowserRouter>
      <>
        <div>{showHome ? 
          <div>
            <Home /> 
            <button className="home_buttons" onClick={handleNewDeck}>Create a New Deck</button>
            <button className="home_buttons" onClick={handleLoadDeck}>Manage/Load Deck</button>
          </div> : ""}
        </div>
        <div>{showLoad ?
          <div>
            <Load />
          </div> : "" }
        </div>
        <div>{showNew ?
          <div>
            <New />    
          </div> : ""}
        </div>
        {showBackHome ? <button className="home_buttons" onClick={handleBackHome}>Back to Home Page</button> : ""}
      </>
    </BrowserRouter>
  );
}

export default App;

