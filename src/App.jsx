import {  useState } from 'react'
import upperBlob from "./assets/intro-uppeer.png"
import lowerBlob from "./assets/intro-lower.png"
import QuizPage from './quiz'
import './App.css'

function App() {
  const [startQuiz, setStartQuiz] = useState(true)
  const [quizOptions, setQuizOptions] = useState({
    category: "",
    difficulty: "",
    type: ""
  })


  function handleChange(event){
    const {name,value} = event.target;
    setQuizOptions(prevQuizOptions =>{
      return(
        {
          ...prevQuizOptions,
          [name]: value
        }
      )
    })
  }

  function handleSubmit(){
    setStartQuiz(prevSate => !prevSate)
  }

  return(
    <div className='app'>
      {
        startQuiz && 
        <div className='intro--page'>
          <div className='blob--upper'>
            <img src={upperBlob} alt="" />
          </div>
          <div className='quiz--select'>
            <h1>Quizzical</h1>
            <p>Answer these questions and test your knowledge. Have fun!</p>
            <form  className='gameoptions'>
              <label htmlFor="category">Category: </label>
                <select 
                    id="category"
                    value={quizOptions.category}
                    onChange={handleChange}
                    name="category"
                >
                  <option value="">Any Category</option>
									<option value="9">General Knowledge</option>
									<option value="10">Entertainment: Books</option>
									<option value="11">Entertainment: Film</option>
									<option value="12">Entertainment: Music</option>
									<option value="13">Entertainment: Musicals &amp; Theatres</option>
									<option value="14">Entertainment: Television</option>
									<option value="15">Entertainment: Video Games</option>
									<option value="16">Entertainment: Board Games</option>
									<option value="17">Science &amp; Nature</option>
									<option value="18">Science: Computers</option>
									<option value="19">Science: Mathematics</option>
									<option value="20">Mythology</option>
									<option value="21">Sports</option>
									<option value="22">Geography</option>
									<option value="23">History</option>
									<option value="24">Politics</option>
									<option value="25">Art</option>
									<option value="26">Celebrities</option>
									<option value="27">Animals</option>
									<option value="28">Vehicles</option>
									<option value="29">Entertainment: Comics</option>
									<option value="30">Science: Gadgets</option>
									<option value="31">Entertainment: Japanese Anime &amp; Manga</option>
									<option value="32">Entertainment: Cartoon &amp; Animations</option>
                </select>
                <br />
                <label htmlFor="difficulty">Difficulty: </label>
                <select 
                  name="difficulty" 
                  id="difficulty"
                  onChange={handleChange}
                  value = {quizOptions.difficulty}
                  >
                  <option value="">Any Difficulty</option>
									<option value="easy">Easy</option>
									<option value="medium">Medium</option>
									<option value="hard">Hard</option>
                </select>
                <br />
                <label htmlFor="type">Type:</label>
                <select 
                name="type" 
                id="type"
                value={quizOptions.type}
                onChange = {handleChange}
                >
                  <option value="">Any Type</option>
									<option value="multiple">Multiple Choice</option>
									<option value="boolean">True or False</option>
                </select><br />
                

            </form>
            <button className='startquiz'onClick={handleSubmit} >Start quiz</button>
          </div>
          <div className='blob--bottom'>
            <img src={lowerBlob} alt="" />
          </div>
        </div>
      }
      {
        !startQuiz &&
        <QuizPage
          quizOptions = {quizOptions}
          newQuiz ={handleSubmit}
        />
      }
    </div>
  )

  
}

export default App
