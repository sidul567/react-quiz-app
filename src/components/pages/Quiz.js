import React, { useEffect, useReducer, useState } from 'react'
import Answers from '../Answers'
import ProgressBar from '../ProgressBar'
import MiniPlayer from '../MiniPlayer'
import useQuestions from '../../hooks/useQuestions';
import _ from 'lodash'
import { useLocation, useNavigate, useParams } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { getDatabase, set, ref } from 'firebase/database';

const initialState = null;
const reducer = (state,action)=>{
    switch(action.type){
        case 'questions':
            action.value.forEach((question)=>{
                question.options.forEach((option)=>{
                    option.checked = false;
                })
            })
            return action.value
        case 'answers':
            const questions = _.cloneDeep(state);
            questions[action.questionID].options[action.optionIndex].checked = action.value

            return questions
        default:
            return state
    }
}

function Quiz() {
    const {id} = useParams();
    const {loading,error,questions} = useQuestions(id);
    const [currentQuestion,setCurrentQuestion] = useState(0);
    const [qna,dispatch] = useReducer(reducer,initialState);
    const {currentUser} = useAuth();
    const navigate = useNavigate();
    const {state} = useLocation();
    const {videoTitle} = state;
    useEffect(()=>{
        dispatch({
            type : 'questions',
            value : questions
        })
    },[questions])
    const handleChange = (e,index)=>{
        dispatch({
            type : 'answers',
            questionID : currentQuestion,
            optionIndex : index,
            value : e.target.checked
        })
    }

    // handle for next question, previous question and submit
    const nextQuestion = ()=>{
        if(currentQuestion+1<questions.length){
            setCurrentQuestion(currentQuestion+1);
        }
    }
    const prevQuestion = ()=>{
        if(currentQuestion>0){
            setCurrentQuestion(currentQuestion-1);
        }
    }
    const submitQuestion = async ()=>{
        const {uid} = currentUser;
        const db = getDatabase();
        const resultRef = ref(db,"result/"+uid)

        await set(resultRef,{
            [id] : qna
        })

        navigate(`/result/${id}`,{state : {qna}})
    }
    const percentage = questions.length>0 ? (currentQuestion+1)/questions.length * 100 : 0;
    return (
        <>
            {loading && <div style={{textAlign:'center'}}>Loading...</div>}
            {error && <div className="error">There was an error!</div>}
            {!loading && !error && qna && qna.length>0 && (
                <>
                    <h1>{qna[currentQuestion].title}</h1>
                    <h4>Question can have multiple answers</h4>
                    <Answers
                        input={true} 
                        options={qna[currentQuestion].options} 
                        handleChange={handleChange} 
                    /> 
                    <ProgressBar
                        next = {nextQuestion}
                        prev = {prevQuestion}
                        submit = {submitQuestion}
                        progress = {percentage}
                    />
                    <MiniPlayer
                        id = {id}
                        title = {videoTitle}
                    />
                </>
            )}
            
        </>
    )
}

export default Quiz
