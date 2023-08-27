import React, { useState } from 'react';
import Illustration from '../Illustration';
import image from "../../assets/images/undraw_mobile_login_re_9ntv.svg"
import TextInput from '../TextInput';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Form from '../Form';
import Button from '../Button';

function AdminLogin() {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e){
      e.preventDefault();
      
      if(username=="admin" && password=="admin"){
        navigate("/adminmenu",{
            state:{
                username: "admin"
            }
        });
      }else{
        setError(true);
      }
  }

  return(
      <>
        <h1>Admin Login</h1>
        <div className='column'>
            <Illustration image={image} />
            <Form style={{height : '300px'}} onSubmit={handleSubmit}>
                <TextInput type="text" placeholder="Enter admin username" icon="alternate_email" required value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <TextInput type="password" placeholder="Enter Password" icon="lock" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <Button type="submit" className="button"><span>Submit Now</span></Button>
                {error && <p className="error">"Wrong username or password!!"</p>}
            </Form>
        </div>
      </>
  );
}

export default AdminLogin;
