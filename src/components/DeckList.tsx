import { React, useState, useEffect } from 'react';
import DeckService from "../services/deck_service";
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function DeckList({currentUserId, setComponent, setCurrentDeckId}){
    const [decks, setDecks] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isSelected, setSelected] = useState(true);

    
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
            <button onClick={() => setComponent("home")}>Log out</button>
        </div>
    );
}

export default DeckList;