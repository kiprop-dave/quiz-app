import {nanoid} from "nanoid"
import { useEffect, useState } from "react"
import Questions from "./components/questions"
const parseEntities = txt => new DOMParser().parseFromString(txt, 'text/html').body.innerText;


export default function QuizPage(props){
    const [apiData, setApiData] = useState({})
    const {category,difficulty,type} = props.quizOptions; //stores the user inputs to state
    const [score,setScore] = useState(0)
    const [allAnswered, setAllAnswered] = useState(false)
    
    

    useEffect(() =>{
        fetch(`https://opentdb.com/api.php?amount=2&category=${category}&difficulty=${difficulty}&type=${type}`)
          .then(res => res.json())
          .then(data => setApiData(data))
      },[])


    const {results} = apiData
    const [questionsArray, setQuestionsArray] = useState([])

    useEffect(
        () => {
            setQuestionsArray(questionsArrayInit)
        },[results]
    )

    useEffect(() =>{
        const questionAnswered = questionsArray?.every(quiz => quiz.isAnswered)
        //console.log(questionAnswered)
        if(questionAnswered){
            setAllAnswered(prev => !prev)
            //console.log(questionAnswered)
        }
        else{
            setAllAnswered(false)
        }
    },[questionsArray])
   // console.log(score)
    

    const questionsArrayInit = results?.map(thisQuestionObject =>{
        return(
            {
                id: nanoid(),
                question: thisQuestionObject.question,
                isAnswered: false,
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
                    isCorrect: false
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

    

    function checkScore(){
        questionsArray.forEach(thisQuestionObject => {
            const {allAnswers} = thisQuestionObject
            allAnswers.forEach(thisAnswer => {
                const {isSelected, isCorrect} = thisAnswer
                if(isCorrect && isSelected){
                    setScore(prev => prev +1)
                }else{
                    setScore(prev => prev)
                }
            })
        })
    }

    function handleSubmit(){
        checkScore()
       // console.log(score)
        setQuestionsArray(prevArr => {
            return prevArr.map(thisQuestionObject => {
                const {allAnswers} = thisQuestionObject
                const allAnswersCopy = [...allAnswers]
                const newAnswers = allAnswersCopy.map(thisAnswer => ({
                    ...thisAnswer,
                    isCorrect: thisAnswer.answerCorrect === thisAnswer.answer ? true : false
                }))
                return {
                    ...thisQuestionObject,
                    allAnswers: newAnswers
                }
            })
        })
        
    }

  
    function handleChoice(questionId, answerId){
        setQuestionsArray(prevArr => {
            return prevArr.map(thisQuestionObject => {
                const {allAnswers} = thisQuestionObject
                const newAnswers = allAnswers.map(thisAnswer => {
                    return (
                        thisAnswer.id === answerId ? 
                        {
                            ...thisAnswer,
                            isSelected: !thisAnswer.isSelected,
                        } : 
                        {
                            ...thisAnswer,
                            isSelected: thisAnswer.isSelected ? true : false
                        }
                    )
                })
                return (
                    thisQuestionObject.id === questionId ?
                    {
                        ...thisQuestionObject,
                        isAnswered: true,
                        allAnswers: newAnswers
                    } :
                    thisQuestionObject
                )
            })
        })
    }


    const questions = questionsArray?.map(thisQuestionObject =>{
        return(
            <Questions
                key = {thisQuestionObject.id}
                questionAnswers = {thisQuestionObject}
                choice = {handleChoice}
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
                disabled ={!allAnswered}
            >
                Check answers</button>
        </div>
    )
}