import React, {useState, useEffect} from 'react';
import QuestionService from '../services/question_service';
import DeckService from '../services/deck_service';

function Flashcard({deck_id, setComponent}){

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(true);
  let deck_name: string = "";

  function retrieveQuestions(){
    QuestionService.getDeckQuestions(deck_id)
      .then((response) => {
          setQuestions(response.data);
      })
      .catch((e) => {
          console.log(e);
      })
  }

  function getFlashcardText(): string{
    const currQuestion = questions.at(index);
    if (currQuestion){
      if(showQuestion){
        return "Question:\n" + currQuestion.question;
      } else {
        return currQuestion.answer;
      }
    }else{
      return "";
    }
  }

  function handleIndexCounter(type: string){
    // reset to display question
    setShowQuestion(true);
    if(type=="inc"){
      if(index == questions.length-1){
        setIndex(0);
      }else{
        setIndex(index+1);
      }
    }else{
      if(index == 0){
        setIndex(questions.length-1);
      }else{
        setIndex(index-1);
      }
    }
  }

  function handleFlashcardFlip(){
    if(showQuestion){
      setShowQuestion(false);
    }else{
      setShowQuestion(true);
    }
  }
      
  useEffect(() => {
      retrieveQuestions();
      DeckService.getDeckNameFromId(deck_id)
      .then((response) => {
        deck_name = response.data.deck_name;
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  return ( 
    <div>
        <h1>Deck Name: {deck_name} </h1>
        <button onClick={() => handleFlashcardFlip()}>{getFlashcardText()}</button>
        <br></br>
        <button onClick={() => handleIndexCounter("dec")}>Previous</button>
        <button onClick={() => handleIndexCounter("inc")}>Next</button>
        <br></br>
        <button onClick={() => setComponent("decklist")}>Return</button>
    </div>
  );
}

export default Flashcard;