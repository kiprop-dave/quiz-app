import React from "react";
const parseEntities = txt => new DOMParser().parseFromString(txt, 'text/html').body.innerText;

function Answers(props) {
    //console.log(props.answer)
    const { answer, isCorrect, isSelected } = props.answer

    const getColor = () => { // utility function to get the colour
        let color = 'transparent';
        if (isSelected && !isCorrect) {
            color = "#D6DBF5";
        } else if (isCorrect) {
            color = "#52e271";
        }
        return color;
    }

    const styles = {
        backgroundColor: getColor()
    }


    return (
        <div >
            <div className="answer" style={styles} onClick={props.handleChoice}
            >
                {parseEntities(answer)}
            </div>
        </div>
    )
}

export default Answers