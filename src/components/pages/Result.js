import React from 'react'
import Summary from '../Summary'
import Analysis from '../Analysis'
import useAnswers from '../../hooks/useAnswers';
import { useLocation, useParams } from 'react-router';
import _ from 'lodash'
function Result() {
    const {id} = useParams();
    const location = useLocation()
    const {state} = location
    const {qna} = state;
    const {loading,error,answers} = useAnswers(id);
    function calculation(){
        let score = 0;
        answers.forEach((question,index1)=>{
            let correctIndex = [],
            checkedIndex = [];

            question.options.forEach((option,index2)=>{
                if(option.correct) correctIndex.push(index2);
                if(qna[index1].options[index2].checked){
                    checkedIndex.push(index2);
                    option.checked = true;
                }
            })

            if(_.isEqual(correctIndex,checkedIndex))
                score += 5;
        })
        return score;
    }
    const userScore = calculation();
    return (
        <>
            {answers.length>0 && (<Summary score={userScore} noq={answers.length} />)}
            <Analysis answers={answers} />
        </>
    )
}

export default Result
