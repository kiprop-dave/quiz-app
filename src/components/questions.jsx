import { useState } from "react";
import Answers from "./answers"
const parseEntities = txt => new DOMParser().parseFromString(txt, 'text/html').body.innerText;

export default function Questions({ questionAnswers, choice }) {
    //console.log(props.questionAnswers)
    const { allAnswers, question, isAnswered } = questionAnswers

    //  const questions = props.questionAnswers.question;
    const answers = allAnswers?.map((thisAnswer) => {
        return (

            <Answers
                key={thisAnswer.id}
                answer={thisAnswer}
                handleChoice={() => choice(thisAnswer.id)}

            />

        )
    })


    return (
        <div className="questions">
            <div>
                <h2 className="question-head">{parseEntities(question)}</h2>
                <div className="answers-container">
                    {answers}
                </div>
                <div className="separator"></div>
            </div>
        </div>
    )
}