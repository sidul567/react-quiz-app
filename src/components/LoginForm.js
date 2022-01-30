import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from './Button'
import TextInput from './TextInput'
import Form from './Form'
import { useAuth } from '../contexts/AuthContext'
function LoginForm() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState();
    const [loading,setLoading] = useState();
    const navigate = useNavigate()
    const {login} = useAuth();

    async function handleSubmit(e){
        e.preventDefault();

        try{
            setError("");
            setLoading(true);
            await login(email,password);
            navigate("/");
        }catch(e){
            console.log(e);
            setLoading(false)
            setError(e.message);
        }
    }

    return (
        <Form style={{height : '330px'}} onSubmit={handleSubmit}>
            <TextInput type="email" placeholder="Enter Email" icon="alternate_email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <TextInput type="password" placeholder="Enter Password" icon="lock" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <Button disabled={loading} type="submit" className="button"><span>Submit Now</span></Button>
            {error && <p className="error">{error}</p>}
            <div className="info">Don't have an account? <Link to="/signup">Sign up</Link> instead.</div>
        </Form>
    )
}

export default LoginForm
