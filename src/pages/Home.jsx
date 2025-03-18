import React from "react";
import appLogo from '../assets/flashcard.svg';
import Deck from './Deck';

function Home(){

  const handleCreateNewDeck = (event) => console.log("Create New Deck");
  const handleLoadDeck = (event) => console.log("Manage/Load Decks");
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
                <div className = "home_buttons">
                  <button onClick={handleCreateNewDeck}>Create a New Deck</button>
                  <button onClick={handleLoadDeck}>Manage/Load Decks</button>
                </div>
          </div>    
        </>
    )
}

export default Home;