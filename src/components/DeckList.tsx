import { React, useState, useEffect } from 'react';
import DeckService from "../services/deck_service";

function DeckList(){
    const [decks, setDecks] = useState([]);
    
    /**
     * Calls a Deck Service method to get all decks. Will need to update to get decks for a particular user
     */
    const retrieveDecks = () => {
        DeckService.getAllDecks()
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
            {decks.map((deck) => 
                <li key={deck.deck_id}>{deck.deck_name}</li>
            )}
        </div>
    );
}

export default DeckList;