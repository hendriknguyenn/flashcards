import React, {useState} from "react";
interface DeckProps {
    questions: string[];
}
function Deck() {
    let heading = "Quiz #1";
    let questions = new Map([
        [1, "What is the state capitol of California?"],
        [2, "Who is the President of the United States?"],
    ]);
    let answers = new Map([
        [1, "Sacramento"],
        [2, "Donald Trump"],
    ]);
    // hook for showing question
    const [selectedIndex, setSelectedIndex] = useState(1);
    // hook for showing answer
    const [showAnswer, setShowAnswer] = useState(false);

    function incrementIndex(){
        selectedIndex == questions.size ? setSelectedIndex(1) : setSelectedIndex(selectedIndex+1);
        setShowAnswer(false);
    }

    function decrementIndex(){
        console.log('current index' + selectedIndex)
        selectedIndex == 1 ? setSelectedIndex(questions.size) : setSelectedIndex(selectedIndex-1);
        setShowAnswer(false);
    }

    return (
        <>
            <h1>Deck Name: {heading}</h1>
            <h2>Card Count: {questions.size} </h2>
            <p>{questions.get(selectedIndex)}</p>
            <button onClick={decrementIndex}>Previous</button>
            <button onClick={() => setShowAnswer(true)}>Show Answer</button>
            <button onClick={incrementIndex}>Next</button>
            <p>{showAnswer ? answers.get(selectedIndex) : ""}</p>
        </>
    )
}

export default Deck;