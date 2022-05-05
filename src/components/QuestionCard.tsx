
import React from "react";
import './questionCard.css'
import{AnswersObject} from '../App'
type Props={
    question:string;
    answers:string[];
    callBack:(e:React.MouseEvent<HTMLInputElement>)=>void;
    userAnswer:AnswersObject|undefined;
    questionNr:number;
    totalQuestions:number;
}

const QustionCard:React.FC<Props>=({totalQuestions,question,answers,userAnswer,callBack,questionNr})=>{

    console.log(userAnswer?.correctAnswer+" "+userAnswer?.answer);
    
    
    return(
        <div className="container">
            <p>Question: {questionNr} / {totalQuestions}</p>
            <p>{question}</p>
            <div>
                {
                    answers.map(answer=>(
                        <div className="buttonWrapper" key={answer}>
                
                            <input type="button" onClick={callBack} disabled={userAnswer ? true : false} value={answer} className={userAnswer?.correctAnswer===answer?"correct":userAnswer?.answer&&"wrong"}/>
                        </div>
                    ))
                }
               
            </div>
        </div>
    )
}
export default QustionCard