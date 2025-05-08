import { React, useState, useEffect } from 'react';
import DeckService from "../services/deck_service";
import { response } from 'express';
import res from 'express/lib/response';
import tailwindcss from '@tailwindcss/vite';
import '../styles/DeckList.css';

function DeckList({currentUserId, setComponent, setCurrentDeckId, setCurrentUserId, currentDeckId}){
    const [decks, setDecks] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [showDeckCreation, setShowDeckCreation] = useState(false);
    const [newDeckName, setNewDeckName] = useState("");

    
    /**
     * Calls a Deck Service method to get all decks
     */
    const retrieveDecks = () => {
        DeckService.getUserDecks(currentUserId)
            .then((response) => {
                setDecks(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    function handleDeckSelection(index: number, deck_id: number){
        //de-select an already selected deck
        if (index == selectedIndex){
            setSelectedIndex(-1);
            setCurrentDeckId(-1);
        } else {
            setSelectedIndex(index);
            setCurrentDeckId(deck_id);
        }
    }

    function handleNew(){
        DeckService.create({deck_name: newDeckName, owner_id: currentUserId})
        .then((response) => {
            console.log(response.data);
            setCurrentDeckId(response.data.deck_id);
            setComponent("questionlist")
        })
        .catch((e) => {
            console.log(e);
        });
    }

    function handleDelete(){
        DeckService.remove(currentDeckId)
        .then((response) => {
            setSelectedIndex(-1);
            retrieveDecks();
        })
        .catch((e) => {
            console.log(e);
        });
    }

    function handleLogout(){
        setComponent("home");
        setCurrentUserId(-1);
    }

    //Get list of decks from database
    useEffect(() => {
        retrieveDecks();
    }, []);

    return (
        <div className="flex flex-col min-h-screen min-w-screen justify-center">
            <div id='deck-headers'>
                <h1>Deck List</h1>
                <h2>Current User: {currentUserId}</h2>
            </div>
            <div>
                <ul role="list">
                    {decks.map((deck, index) => 
                        <li key={deck.deck_id}
                            className={selectedIndex === index ? "bg-blue-100" : "bg-black-100"}
                            onClick={() => handleDeckSelection(index, deck.deck_id)}
                        >
                            {deck.deck_name}
                            
                        </li>
                    )}
                </ul>
            </div>
            <div id='deck-buttons' className="flex flex-row min-w-screen">
                <button disabled={selectedIndex===-1} onClick={() => setComponent("flashcard")}>Select</button>
                <button onClick={() => setShowDeckCreation(true)}>New Deck</button>
                <button disabled={selectedIndex===-1} onClick={() => setComponent("questionlist")}>Edit Deck</button>
                <button disabled={selectedIndex===-1} onClick={handleDelete}>Delete</button>
                <button onClick={handleLogout}>Log out</button>
            </div>
            
            <br></br>
            {showDeckCreation ? 
            <div id='deck-new' className="flex flex-row">
                <form>
                    <label>Deck Name:</label>
                    <input type="text" onChange={(e) => setNewDeckName(e.target.value)}></input>
                    <input id='new-deck-input' type="button" value="Create Deck" onClick={handleNew}/>
                    <input id='new-deck-input' type="button" value="Cancel" onClick={() => setShowDeckCreation(false)}/>
                </form>
            </div> : null}
        </div>
    );
}

export default DeckList;