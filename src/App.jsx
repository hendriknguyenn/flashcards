import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route } from "react-router-dom";
import Deck from './pages/Deck';
import Home from './pages/Home';
import './App.css';

function App(){
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
}

export default App;

