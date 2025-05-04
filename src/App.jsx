import React, {useState, useEffect} from 'react';
import { BrowserRouter} from "react-router-dom";
import './App.css';
import Home from './components/Home.tsx';
import DeckList from './components/DeckList.tsx';
import QuestionList from './components/QuestionList.tsx';
import Flashcard from './components/Flashcard.tsx';


function App(){
  const [component, setComponent] = useState("home");
  const [currentUserId, setCurrentUserId] = useState(0);
  const [currentDeckId, setCurrentDeckId] = useState(0);

  return ( 
    <BrowserRouter>
    <div>
      {component === "home" ? <Home currentUserId={currentUserId} setCurrentUserId={setCurrentUserId} setComponent={setComponent}/> : null}
      {component === "decklist" ? <DeckList currentUserId={currentUserId} setComponent={setComponent} setCurrentDeckId={setCurrentDeckId} setCurrentUserId={setCurrentUserId} currentDeckId={currentDeckId}/> : null}
      {component === "questionlist" ? <QuestionList deck_id={currentDeckId} setComponent={setComponent}/>: null}
      {component === "flashcard" ? <Flashcard deck_id={currentDeckId} setComponent={setComponent}/> : null}
    </div>
    </BrowserRouter>
  );
}

export default App;