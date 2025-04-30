import { React, useEffect, useState} from 'react';
import QuestionService from '../services/question_service';

function QuestionList({deck_id, setComponent}){

    const [questions, setQuestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
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
        } else {
            setSelectedIndex(index);
            setCurrentQuestionId(question_id);
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
            console.log(response.data);
        })
        .catch((e) => {
            console.log(e);
        })
    }

    function handleEdit(){

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
                        onClick={() => handleQuestionSelection(index, question.question_id)}
                    >{question.question}</li>
                )}
            </ul>
            <div>
                <button disabled={showDetails =="edit"} onClick={() => setShowDetails("add")}>Add</button>
                <button disabled={selectedIndex==-1 || showDetails=="add"} onClick={() => setShowDetails("edit")}>Edit</button>
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
                        <input type="button" value="Enter" onClick={handleAdd}></input>
                        <input type="button" value="Cancel" onClick={handleCancel}></input>
                    </form>
                </div>
            }
        </div>
    );
}

export default QuestionList;