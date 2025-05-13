import { React, useEffect, useState} from 'react';
import QuestionService from '../services/question_service';
import DeckService from '../services/deck_service';

function QuestionList({deck_id, setComponent}){

    const [questions, setQuestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [deckName, setDeckName] = useState("");
    const [deckNameText, setDeckNameText] = useState();
    const [questionText, setQuestionText] = useState("");
    const [answerText, setAnswerText] = useState("");
    const [currentQuestionId, setCurrentQuestionId] = useState(-1);
    //showDetails can be: empty, add, or edit
    const [showDetails, setShowDetails] = useState("");

    function retrieveQuestions(){
        QuestionService.getDeckQuestions(deck_id)
        .then((response) => {
            setQuestions(response.data);
        })
        .catch((e) => {
            console.log(e);
        })
    }

    function handleQuestionSelection(index: number, question_id: number){
        //de-select an already selected question
        if (index == selectedIndex){
            setSelectedIndex(-1);
            setCurrentQuestionId(-1);
            // handle case when edit details form is shown but user de-selects
            if(showDetails=="edit"){
                setShowDetails("");
            }else{
                setShowDetails("edit");
            }

        } else {
            setSelectedIndex(index);
            setCurrentQuestionId(question_id);
            setShowDetails("");
        }
    }

    function handleAdd(){
        //need to disable edit button by resetting selectedIndex
        setSelectedIndex(-1);
        QuestionService.addQuestion({deck_id: deck_id, question: questionText, answer: answerText})
        .then((response) => {
            retrieveQuestions();
            setQuestionText("");
            setAnswerText("");
            setShowDetails("");
            console.log(response.data);
        })
        .catch((e) => {
            console.log(e);
        })
    }

    function prepareEdit(){
        const question = questions.at(selectedIndex);
        setQuestionText(question.question);
        setAnswerText(question.answer);
        setShowDetails("edit")
    }

    function handleEdit(){
        const question_data = {
            deck_id: deck_id,
            question: questionText,
            answer: answerText,
        }
        QuestionService.updateQuestion(currentQuestionId, question_data)
        .then((response) => {
            retrieveQuestions();
            setQuestionText("");
            setAnswerText("");
            setShowDetails("");
            setSelectedIndex(-1);
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function handleDelete(){
        QuestionService.deleteQuestion(currentQuestionId)
        .then((response) => {
            setSelectedIndex(-1);
            retrieveQuestions();
            console.log(response)
        })
        .catch((err) => {
            console.log(err);
        });
    }

    function handleCancel(){
        setShowDetails("");
        setQuestionText("");
        setAnswerText("");
        setSelectedIndex(-1);
    }

    useEffect(() => {
        retrieveQuestions();
        DeckService.getDeckNameFromId(deck_id)
            .then((response) => {
                console.log(response.data + deck_id);
                setDeckName(response.data.deck_name);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return(
        <div className='flex flex-col min-h-screen min-w-screen'>
            <div>
                <h1>Question List</h1>
                <h2>Deck Name: {deckName}</h2>
            </div>
            <div>
                <ul className="list-group">
                    {questions.map((question, index) => 
                        <li 
                            key={question.question_id}
                            className={selectedIndex === index ? "bg-blue-100" : "bg-black-100"}
                            onClick={() => handleQuestionSelection(index, question.question_id)}
                        >{question.question}</li>
                    )}
                </ul>
            </div>
            <div className="flex flex-row">
                <button disabled={showDetails =="edit"} onClick={() => setShowDetails("add")}>Add</button>
                <button disabled={selectedIndex==-1 || showDetails=="add"} onClick={prepareEdit}>Edit</button>
                <button disabled={selectedIndex==-1} onClick={handleDelete}>Delete</button>
                <button onClick={() => setComponent("decklist")}>Return</button>
            </div>
            {showDetails === "" ? null : 
                <div>
                    <form id="question">
                        <label>Question:</label>
                        <input type="text" value={questionText} onChange={(e) => setQuestionText(e.target.value)}/>
                        <br></br>
                        <label>Answer:</label>
                        <input type="text" value={answerText} onChange={(e) => setAnswerText(e.target.value)}/>
                        <br></br>
                        <input type="button" value="Enter" onClick={showDetails === "add" ? handleAdd : handleEdit}></input>
                        <input type="button" value="Cancel" onClick={handleCancel}></input>
                    </form>
                </div>
            }
        </div>
    );
}

export default QuestionList;