import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route } from "react-router-dom";
import Deck from './components/DeckPage.tsx';
import Home from './components/Home.jsx';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Details from './components/Details.tsx';

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
            <Details detail_type='list' header='Load a Deck' list_header='Deck List'/>
          </div> : "" }
        </div>
        <div>{showNew ?
          <div>
            <Details detail_type='new' header='Create a Deck' list_header='Question List'/>    
          </div> : ""}
        </div>
        {showBackHome ? <button className="home_buttons" onClick={handleBackHome}>Back to Home Page</button> : ""}
      </>
    </BrowserRouter>
  );
}

export default App;

