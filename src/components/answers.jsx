import React from "react";
const parseEntities = txt => new DOMParser().parseFromString(txt, 'text/html').body.innerText;

function Answers(props){
    //console.log(props.answer)
    const {answer,isCorrect,isSelected} = props.answer

    const styles = {
        backgroundColor: isSelected ? "#D6DBF5" : 
            isCorrect ? "#94D7A2": 
            isCorrect && isSelected ? "#FFA500" :
            "transparent"
    }


    return(
        <div >
            <div className="answer" style={styles} onClick ={props.handleChoice}
            >
                {parseEntities(answer)}
            </div>
        </div>
    )
}

export default Answers