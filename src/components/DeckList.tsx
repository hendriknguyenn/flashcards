import { React, useState, useEffect } from 'react';
import DeckService from "../services/deck_service";

function DeckList({currentUserId}){
    const [decks, setDecks] = useState([]);
    
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

    //Get list of decks from database
    useEffect(() => {
        retrieveDecks();
    }, []);

    return (
        <div>
            <h1>Deck List</h1>
            <h4>Current User: {currentUserId}</h4>
            {decks.map((deck) => 
                <li key={deck.deck_id}>{deck.deck_name}</li>
            )}
        </div>
    );
}

export default DeckList;