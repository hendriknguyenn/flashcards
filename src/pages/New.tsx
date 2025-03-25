import React, { useState } from 'react';
import './New.css';

function New(){
    let header = "New Deck";
    let question_list = new Map([
        [1, "What are the first 3 digits of Pi?"],
        [2, "At what rate does Earth's gravitational velocity increase?"],
    ]);
    let answer_list = new Map([
        [1, "3.14"],
        [2, "9.8 meters per second squared"],
    ]);

    const [selectedQuestion, setSelectedQuestion] = useState(-1);
    // hook for question form
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    function questionForm() {

        return(
            <form>
                <label>Question:
                    <input 
                        type="text"
                        value={selectedQuestion === -1 ? question : question_list.get(selectedQuestion+1)}
                        onChange={(event) => setQuestion(event.target.value)}
                    />
                </label>
                <label>Answer:
                <input 
                        type="text"
                        value={selectedQuestion === -1 ? answer : answer_list.get(selectedQuestion+1)}
                        onChange={(event) => setAnswer(event.target.value)}
                    />
                </label>
            </form>
        )
    }

    function showAddButton(){
        if(question == "" && answer == "" && selectedQuestion == -1){
            return ""
        }
    }

    function handleAddQuestion(){
        console.log(question);
        console.log(answer);
        setQuestion("");
        setAnswer("");
    }
    return(
        <>
            <div className = 'container'>
                <div className = "row">
                    <div className="col-9" id="top-pane"><h1>{header}</h1></div>
                    <div className="col-4" id="left-pane">
                        <ul className="list-group">
                            <h2>Question List</h2>
                            {Array.from(question_list).map(([key, value]) => (
                                <li
                                className= {selectedQuestion === key-1 ? "list-group-item active" : "list-group-item"}
                                onClick={() => setSelectedQuestion(key-1)}
                                key={key}>
                                    {key}: {value}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-6" id="right-pane">
                        <div className='container'>
                            <div className='row'>
                                <div className ='col'>
                                    {questionForm()}
                                </div>
                                <div className ='col'>
                                    {question ? "" : <button onClick={handleAddQuestion}>Add Question</button>}
                                    {selectedQuestion === -1 ? "" : <button>Edit Question</button>}
                                    {selectedQuestion === -1 ? "" : <button>Delete Question</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default New;