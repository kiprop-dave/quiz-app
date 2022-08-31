import { useState } from "react";
import Answers from "./answers"
const parseEntities = txt => new DOMParser().parseFromString(txt, 'text/html').body.innerText;

export default function Questions(props){
    //console.log(props.questionAnswers)
    const {allAnswers,question,id} = props.questionAnswers

  //  const questions = props.questionAnswers.question;
    const answers = allAnswers?.map(thisAnswer =>{
        return( 
            
            <Answers
                key = {thisAnswer.id}
                answer = {thisAnswer}
                handleChoice = {() => props.choice(id,thisAnswer.id)}
                
            />
            
        )
    })


    return(
        <div className="questions">
            <div>
                <h2 className="question-head">{parseEntities(question)}</h2>
                <div className="answers-container">
                    {answers}
                </div>
                <hr />
            </div>
        </div>
    )
}