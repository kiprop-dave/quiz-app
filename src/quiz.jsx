import { nanoid } from "nanoid"
import { useEffect, useState } from "react"
import Questions from "./components/questions"
// const parseEntities = txt => new DOMParser().parseFromString(txt, 'text/html').body.innerText;
import { myData } from "./data"


export default function QuizPage({ quizOptions, newQuiz }) {
    const [apiData, setApiData] = useState({})
    const { category, difficulty, type } = quizOptions; //stores the user inputs to state
    const [score, setScore] = useState(0)
    const [allAnswered, setAllAnswered] = useState(false)
    const [submitted, setSubmitted] = useState(false);



    useEffect(() => {
        fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=${type}`)
            .then(res => res.json())
            .then(data => setApiData(data))
    }, [])


    const { results } = apiData;
    const [questionsArray, setQuestionsArray] = useState([])

    useEffect(
        () => {
            setQuestionsArray(questionsArrayInit)
        }, [results]
    )

    useEffect(() => {
        const hasFinished = questionsArray?.every(quiz => quiz.allAnswers.some(ans => ans.isSelected));
        setAllAnswered(hasFinished);
        checkScore();
    }, [questionsArray])


    const questionsArrayInit = results?.map(thisQuestionObject => {
        return (
            {
                id: nanoid(),
                question: thisQuestionObject.question,
                isAnswered: false,
                allAnswers: createAllAnswers(thisQuestionObject.incorrect_answers, thisQuestionObject.correct_answer)
            }
        )
    })

    //This function assigns each answer an id,isSelected property and isCorrect property
    function createAllAnswers(incorrectAnswers, correctAnswer) {
        const allAnswers = [...incorrectAnswers, correctAnswer]
        const answers = allAnswers.map(thisAnswer => {
            return (
                {
                    id: nanoid(),
                    answer: thisAnswer,
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
        let currentIndex = array.length, randomIndex;

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

    function checkScore() { // function to update the score
        let totalScore = 0;
        questionsArray?.forEach(quiz => {
            const { allAnswers } = quiz;
            allAnswers.forEach(ans => {
                const { isSelected, answer, answerCorrect } = ans;
                if (isSelected && answer === answerCorrect) {
                    totalScore += 1;
                }
            })
        })
        setScore(totalScore);
    }

    function checkAnswers() {
        setQuestionsArray(prevArr => {
            return prevArr.map(thisQuestionObject => {
                const { allAnswers } = thisQuestionObject
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

    function handleSubmit() {
        checkAnswers();
        setSubmitted(true);
    }

    function handleChoice(answerId) {
        const _allQuestions = [...questionsArray];
        const questionIndex = _allQuestions.findIndex(quiz => quiz.allAnswers.some(answ => answ.id === answerId));
        const question = _allQuestions[questionIndex];
        const { allAnswers } = question;
        const _answers = allAnswers.map(ans => {
            return (
                ans.id === answerId ?
                    {
                        ...ans,
                        isSelected: true
                    } :
                    {
                        ...ans,
                        isSelected: false
                    }
            )
        })
        question.allAnswers = [..._answers];
        setQuestionsArray(_allQuestions);
    }


    const questions = questionsArray?.map(thisQuestionObject => {
        return (
            <Questions
                key={thisQuestionObject.id}
                questionAnswers={thisQuestionObject}
                choice={handleChoice}
            />
        )
    })

    return (
        <div className="question-page">
            <div className="questions-container">
                {questions}
                <div className="button-container">
                    {
                        !submitted ?
                            <button className="checkanswers submit" onClick={() => handleSubmit()}
                                disabled={!allAnswered}
                            >
                                Check answers
                            </button> :
                            <>
                                <h4 className="score">You scored {score}/5</h4>
                                <button className="checkanswers" onClick={() => newQuiz()}>
                                    PLAY AGAIN
                                </button>
                            </>

                    }
                </div>
            </div>
        </div>
    )
}