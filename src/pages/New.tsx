import React, { useState } from 'react';

function New(){
    let header = "New Deck";
    let question_list = new Map([
        [1, "What are the first 3 digits of Pi?"],
        [2, "At what rate does Earth's gravitational velocity increase?"],
    ]);

    const [selectedQuestion, setSelectedQuestion] = useState(0);

    return(
        <>
            <div className = 'container'>
                <div className = "row">
                    <div className="col-9" id="top-pane"><h1>{header}</h1></div>
                    <div className="col-4" id="left-pane">
                        <ul className="list-group">
                            <h2>Question List</h2>
                        </ul>
                    </div>
                    <div className="col-6" id="right-pane">
                        <button>Add Question</button>
                        <button>Edit Question</button>
                        <button>Delete Question</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default New;