import React, {useState, useEffect} from 'react';
import { BrowserRouter} from "react-router-dom";
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home.tsx';
import DeckList from './components/DeckList.tsx';


function App(){
  const [component, setComponent] = useState("home");
  const [currentUserId, setCurrentUserId] = useState(0);

  return ( 
    <BrowserRouter>
    <div>
      {component === "home" ? <Home currentUserId={currentUserId} setCurrentUser={setCurrentUserId} setComponent={setComponent}/> : null}
      {component === "decklist" ? <DeckList currentUserId={currentUserId}/> : null}
    </div>
    </BrowserRouter>
  );
}

export default App;