import { useState } from "react";
import Answers from "./answers"
const parseEntities = txt => new DOMParser().parseFromString(txt, 'text/html').body.innerText;

export default function Questions(props){
    //console.log(props)
    const [allAnswers,setAllAnswers] = useState(props.questionAnswers.allAnswers)

    const questions = props.questionAnswers.question;
    const answers = allAnswers?.map(thisAnswer =>{
        return( 
            
            <Answers
                key = {thisAnswer.id}
                answer = {thisAnswer}
                handleChoice = {() =>handleChoice(thisAnswer.id)}
                
            />
            
        )
    })


    //This function handles the user selection
    function handleChoice(id){
        setAllAnswers(prevArray =>{
            return(
                prevArray?.map(thisAnswer =>{
                    return(
                        thisAnswer.id === id ?
                        {
                            ...thisAnswer,
                            isSelected: !thisAnswer.isSelected
                        }:
                        {
                            ...thisAnswer,
                            isSelected: false
                        } 
                    )
                })
            )
        })
    }

    return(
        <div className="questions">
            <div>
                <h2 className="question-head">{parseEntities(questions)}</h2>
                <div className="answers-container">
                    {answers}
                </div>
                <hr />
            </div>
        </div>
    )
}