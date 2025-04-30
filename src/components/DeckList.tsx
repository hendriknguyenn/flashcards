import { React, useState, useEffect } from 'react';
import DeckService from "../services/deck_service";
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { response } from 'express';

function DeckList({currentUserId, setComponent, setCurrentDeckId, setCurrentUserId}){
    const [decks, setDecks] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isSelected, setSelected] = useState(true);
    const [showDeckCreation, setShowDeckCreation] = useState(false);
    const [newDeckName, setNewDeckName] = useState("");

    
    /**
     * Calls a Deck Service method to get all decks. Will need to update to get decks for a particular user
     */
    const retrieveDecks = () => {
        DeckService.getUserDecks(currentUserId)
            .then((response) => {
                setDecks(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    function handleDeckSelection(index: number, deck_id: number){
        //de-select an already selected deck
        if (index == selectedIndex){
            setSelectedIndex(-1);
            setSelected(true);
            setCurrentDeckId(-1);
        } else {
            setSelectedIndex(index);
            setSelected(false);
            setCurrentDeckId(deck_id);
        }
    }

    function handleNewDeck(){
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

    function handleLogout(){
        setComponent("home");
        setCurrentUserId(-1);
    }

    //Get list of decks from database
    useEffect(() => {
        retrieveDecks();
    }, []);

    return (
        <div>
            <h1>Deck List</h1>
            <h4>Current User: {currentUserId}</h4>
            <ul className="list-group">
                {decks.map((deck, index) => 
                    <li 
                        key={deck.deck_id}
                        className={selectedIndex === index ? "list-group-item active" : "list-group-item"}
                        onClick={() => handleDeckSelection(index, deck.deck_id)}
                    >{deck.deck_name}</li>
                )}
            </ul>
            <button disabled={isSelected} onClick={() => setComponent("questionlist")}>Select</button>
            <button onClick={() => setShowDeckCreation(true)}>New Deck</button>
            <button disabled={selectedIndex===-1}>Edit Deck</button>
            <button>Delete</button>
            <button onClick={handleLogout}>Log out</button>
            <br></br>
            {showDeckCreation ? 
            <div>
                <form id="new deck">
                    <label>Deck Name:</label>
                    <input type="text" onChange={(e) => setNewDeckName(e.target.value)}></input>
                    <input type="button" value="Create Deck" onClick={handleNewDeck}/>
                </form>
            </div> : null}
        </div>
    );
}

export default DeckList;