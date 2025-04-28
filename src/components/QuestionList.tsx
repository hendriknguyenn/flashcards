import { React, useEffect, useState} from 'react';
import QuestionService from '../services/question_service';

function QuestionList({deck_id, setComponent}){

    const [questions, setQuestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    function retrieveQuestions(){
        QuestionService.getDeckQuestions(deck_id)
        .then((response) => {
            setQuestions(response.data);
        })
        .catch((e) => {
            console.log(e);
        })
    }

    useEffect(() => {
            retrieveQuestions();
        }, []);

    return(
        <div>
            <h1>Question List</h1>
            <h3>Deck ID: {deck_id}</h3>
            <ul className="list-group">
                {questions.map((question, index) => 
                    <li 
                        key={question.question_id}
                        className={selectedIndex === index ? "list-group-item active" : "list-group-item"}
                        onClick={() => setSelectedIndex(index)}
                    >{question.question}</li>
                )}
            </ul>
            <div>
                <button onClick={() => setComponent("decklist")}>Return</button>
            </div>
        </div>
    );
}

export default QuestionList;