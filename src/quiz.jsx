import {nanoid} from "nanoid"
import { useEffect, useState } from "react"
import Questions from "./components/questions"
const parseEntities = txt => new DOMParser().parseFromString(txt, 'text/html').body.innerText;


export default function QuizPage(props){
    const [apiData, setApiData] = useState({})
    const {category,difficulty,type} = props.quizOptions; //stores the user inputs to state
    const [score,setScore] = useState(0)
    const [isCorrect, setIscorrect] = useState(false)
    

    useEffect(() =>{
        fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=${type}`)
          .then(res => res.json())
          .then(data => setApiData(data))
      },[])


    const {results} = apiData
    const [questionsArray, setQuestionsArray] = useState([])

    useEffect(
        () => {
            setQuestionsArray(questionsArrayInit)
        },[results,isCorrect]
    )
    

    const questionsArrayInit = results?.map(thisQuestionObject =>{
        return(
            {
                id: nanoid(),
                question: thisQuestionObject.question,
                isShown: false,
                allAnswers: createAllAnswers(thisQuestionObject.incorrect_answers,thisQuestionObject.correct_answer)
            }
        )
    })

    //This function assigns each answer an id,isSelected property and isCorrect property
    function createAllAnswers(incorrectAnswers,correctAnswer){
        const allAnswers = [...incorrectAnswers,correctAnswer]
        const answers = allAnswers.map(thisAnswer =>{
            return(
                {
                    id: nanoid(),
                    answer:thisAnswer,
                    answerCorrect: correctAnswer,
                    isSelected: false,
                    isCorrect: thisAnswer === correctAnswer ? isCorrect : false
                }
            )
        })
        return shuffle(answers)
    }

    //Function to shuffle the answers array
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }



    function handleSubmit(){
        // setQuestionsArray(prevArray =>{
        //     return(
        //         prevArray?.map(thisQuestionObject =>{
        //             return(
        //                 {
        //                     ...thisQuestionObject,
        //                     allAnswers: [{},{},{},{},{}]
        //                 }
        //             )
        //         })
        //     )
        // })
        setIscorrect(prevstate => !prevstate)
       //console.log(questionsArray[0])
        //props.newQuiz()
    }
    //console.log(score)


    const questions = questionsArray?.map(thisQuestionObject =>{
        return(
            <Questions
                key = {thisQuestionObject.id}
                questionAnswers = {thisQuestionObject}
                
            />
        )
    })

   // console.log(questionsArray[0].allAnswers)
    return(
        <div className="question-page">
            <div className="questions-container">
                {questions}
                
            </div>
            <button className="checkanswers" onClick={() => handleSubmit()}
                
            >
                Check answers</button>
        </div>
    )
}