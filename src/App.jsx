import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route } from "react-router-dom";
import Deck from './pages/Deck.tsx';
import Home from './pages/Home';
import Load from './pages/Load.tsx';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App(){
  const [showHome, setShowHome] = useState(true);
  const [showLoad, setShowLoad] = useState(false);
  function handleLoadDeck(){
    setShowHome(false);
    setShowLoad(true);
  }
  return ( 
    <BrowserRouter>
      <>
        <div>{showHome ? 
          <div>
            <Home /> 
            <button>Create a New Deck</button>
            <button onClick={handleLoadDeck}>Manage/Load Deck</button>
          </div> : ""}
        </div>
        <div>{showLoad ?
          <div>
            <Load />
          </div> : "" }
        </div>
      </>
    </BrowserRouter>
  );
}

//<div className = "home_buttons">
//<button onClick={handleCreateNewDeck}>Create a New Deck</button>
//<button onClick={handleLoadDeck}>Manage/Load Decks</button>
//</div>

export default App;

