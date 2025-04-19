import React, { useState } from "react";
import Deck from './Deck.tsx';
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Details.css';

interface Props{
    //detail types: list, new, edit
    detail_type: string;
    header: string;
    list_header: string;
}

function Details(prop: Props){
    let header = prop.header;
    let detail_type = prop.detail_type;
    let list_header = prop.list_header;

    //===== test data ====
    let list = [new Deck(1, 'deck 1'), new Deck(2, 'deck 2'), new Deck(3, 'deck 3')];
    let question_list = new Map([
        [1, "What are the first 3 digits of Pi?"],
        [2, "At what rate does Earth's gravitational velocity increase?"],
    ]);
    let answer_list = new Map([
        [1, "3.14"],
        [2, "9.8 meters per second squared"],
    ]);
    // ==================

    const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    //handle functions
    
    /**
     * allows for select and deselect of items in the list
     * @param index index of selected list item
     */
    function handleListSelection(index: number){
        if(selectedItemIndex === index){
            setSelectedItemIndex(-1);
        }else{
            setSelectedItemIndex(index);
        }
    }

    /**
     * Two scenarios: save an edited question, save an edited deck
     */
    function handleSave(){

    }

    function getListItems(){
        // to load deck list, iterate through array of Deck objects and get deck.name
        if(detail_type ==='list'){
            return(
                list.map((item, index) => 
                    <li
                    className = {selectedItemIndex === index ? "list-group-item active" : "list-group-item"} 
                    onClick={() => handleListSelection(index)}
                    key={item.id}>
                    {item.deck_name}    
                    </li>
                )
            )
        //to load questions list, iterate through map of questions and value stores the question -- key is used to correlate question to answer
        }else{
            return(
                Array.from(question_list).map(([key, value]) => (
                    <li
                    className= {selectedItemIndex === key-1 ? "list-group-item active" : "list-group-item"}
                    onClick={() => handleListSelection(key-1)}
                    key={key}>
                        {key}: {value}
                    </li>
                ))
            )
        }
    }

    

    function createDetailsPane(){
        return(
            <div className='col' id='middle-pane'>
                <form>
                    <label>Deck Name:</label>
                        <input type="text"></input>
                    <label>Question:
                        <input 
                            type="text"
                            defaultValue={selectedItemIndex === -1 ? question : question_list.get(selectedItemIndex+1)}
                            onChange={(event) => setQuestion(event.target.value)}
                        />
                    </label>
                    <label>Answer:
                        <input 
                            type="text"
                            defaultValue={selectedItemIndex === -1 ? answer : answer_list.get(selectedItemIndex+1)}
                            onChange={(event) => setAnswer(event.target.value)}
                        />
                    </label>
                </form>
                <button>Save Changes</button>
            </div>
        )
    }


    function createButtonPane(){
        return(
            <div className='row'>
                <div className='col col-6'>
                    <button id='button-pane'>Add</button>
                    // add
                    <button id='button-pane'>Delete</button>
                    <button id='button-pane'>Save</button>
                </div>
                <div className='col col-6'>
                    {detail_type === 'list' ? <button id='button-pane'>Edit</button> : null}
                    {detail_type === 'list' ? <button id='button-pane'>Load</button> : null}
                </div>
            </div>
        )
    }

    return(
        <>
            <div className='container'>
                <div className='row' id='top-pane'>
                    <h1>{header}</h1>
                </div>
                <div className='row'>
                    <div className='col' id='left-pane'>
                        <ul className="list-group">
                            <h2>{list_header}</h2>
                            {getListItems()}
                        </ul>
                    </div>
                    {detail_type === 'list' ? null : createDetailsPane()}
                    <div className='col' id='right-pane'>{createButtonPane()}</div>
                </div>
                <div className='row' id='bottom-pane'>

                </div>
            </div>
        </>
    )
}

export default Details;