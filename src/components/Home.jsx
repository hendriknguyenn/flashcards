import React, { useState } from "react";
import appLogo from '../assets/flashcard.svg';

function Home(){

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
      </>
  )
}

export default Home;