import React, { useState } from 'react';
import AddNewQuizForm from '../AddNewQuizForm';
import TextInput from '../TextInput';
import Button from '../Button'
import { getDatabase, ref, set } from 'firebase/database';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

function AddNewQuiz() {
    let username = "";
    const location = useLocation();
    const {state} = location;
    if(state!=null)
        username = state.username;
    const [quizID,setQuizID] = useState("");
    const [quizQuestion,setQuizQuestion] = useState({});
    const [quizAnswers,setQuizAnswers] = useState({});
    const navigate = useNavigate();
    async function handleSubmit(){
      const db = getDatabase();
      const quizRef = ref(db,"quiz/"+quizID);
      const ansRef = ref(db,"answers/"+quizID)
      try{
        await set(quizRef,{
          questions: quizQuestion
        })
        await set(ansRef,{
          questions: quizAnswers
        })
        navigate("../quizSubmit",{
          state: {
            username: "admin"
          }
        });
      }catch(e){
        console.log(e);
      }
    }

    function handleCallback(options,answers,title,qno){
        // let newQuizQuestion = [...quizQuestion];
        // newQuizQuestion[qno] = {title,option}
        setQuizQuestion((prevQuestion)=>{
          return {...prevQuestion, [qno]:{title: title,options: options}}
        })
        setQuizAnswers((prevAnswer)=>{
          return {...prevAnswer, [qno]:{title: title,options: answers}}
        })
        // setQuizQuestion(newQuizQuestion);
    }

  return <>
    {username!="admin" && <Navigate to="/admin" />}
    {username=="admin" && (
      <>
        <h1>Add New Quiz</h1>
        <div className='column'>
            <TextInput required type="text" placeholder="Quiz ID" icon="lightbulb" value={quizID} onChange={(e)=>setQuizID(e.target.value)}/>
        </div>
        <AddNewQuizForm parentCallback={handleCallback} qno="0" />
        <AddNewQuizForm parentCallback={handleCallback} qno="1" />
        <AddNewQuizForm parentCallback={handleCallback} qno="2" />
        <AddNewQuizForm parentCallback={handleCallback} qno="3" />
        <Button type="submit" className="button"  onClick={handleSubmit}>
          <span>Submit Now</span> 
          <span className="material-icons-outlined">check_circle_outline</span>
        </Button>
      </>
    )}
  </>;
}

export default AddNewQuiz;
