import React, { useState } from "react";
import appLogo from '../assets/flashcard.svg';
import Deck from './Deck';
import Load from "./Load";

function Home(){

  const handleCreateNewDeck = () => {
    console.log("Create New Deck");
  }
  const handleLoadDeck = () => {
    console.log("Manage/Load Decks");
    setShowLoadComponent(true);
  }
  //hook to hide/show to Load "Page"
  const [showLoadComponent, setShowLoadComponent] = useState(false);
  return(
      <>
        <div>
          <h1>Flashcards</h1>
              <h3>A React-Vite Application by Hendrik Nguyen</h3>
              <div>
                <a href="https://github.com/hendriknguyenn/flashcards" target="_blank">
                  <img src={appLogo} className="logo" alt="Flashcards Logo" />
                </a>
              </div>
        </div>
        <div>{showLoadComponent ? <Load /> : ""}</div>    
      </>
  )
}

export default Home;