import React, { useState } from 'react';
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Load.css';
import data from './../data/data.json';

function Load(){
    //get deck names from data.json
    let deck_list: string[] = new Array();
    for(let i=0; i<data.length;i++){
        deck_list.push(data[i].deck_name);
    }
    let header = "Load Deck";
    
    //hook for selected deck
    const [selectedDeck, setSelectedDeck] = useState(0);
    return(
        <>
            <div className = 'container'>
                <div className = "row">
                    <div className="col-9" id="top-pane"><h1>{header}</h1></div>
                    <div className="col-4" id="left-pane">
                        <ul className="list-group">
                            <h2>Decklist</h2>
                            {deck_list.map((item, index) => 
                                <li
                                className = {selectedDeck === index ? "list-group-item active" : "list-group-item"} 
                                onClick={() => setSelectedDeck(index)}
                                key={item}>
                                {item}    
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="col-6" id="right-pane">
                        <button>Load</button>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Load;