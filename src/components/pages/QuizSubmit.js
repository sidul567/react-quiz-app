import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Button from '../Button';

function QuizSubmit() {
    let username = "";
    const location = useLocation();
    const {state} = location;
    if(state!=null)
        username = state.username;
    const navigate = useNavigate();
    function handleClick(e){
        navigate("../"+e.target.name,{
            state: {
                username: "admin"
            }
        });
    }
    console.log(username)
  return <>
    {username!="admin" && <Navigate to="/admin" />}
    {username=="admin" && (
        <>
            <h1 align="center" style={{"color":"#00ff84"}}>Congratulations! Quiz Submitted successfully!</h1>
            <br/>
            <div className='column'>
                <Button className="button" name="adminMenu" onClick={handleClick} >Go to Admin Menu</Button>
                <Button className="button" name="addNewQuiz" onClick={handleClick} >Create another Quiz</Button>
            </div>
        </>
    )}
  </>;
}

export default QuizSubmit;
