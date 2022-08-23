const parseEntities = txt => new DOMParser().parseFromString(txt, 'text/html').body.innerText;

export default function Answers(props){
    console.log(props.answer)

    const styles = {
        backgroundColor: props.answer.isSelected ? "#D6DBF5" : props.answer.isCorrect ? "#94D7A2":"transparent"
    }

    const answer = props.answer.answer;

    return(
        <div >
            <div className="answer" style={styles} onClick ={props.handleChoice}
            >
                {parseEntities(answer)}
            </div>
        </div>
    )
}