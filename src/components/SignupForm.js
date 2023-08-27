import React, { useState } from 'react'
import Form from './Form'
import TextInput from './TextInput'
import Checkbox from './Checkbox'
import Button from './Button'
import { Link,useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function SignupForm() {
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [agree,setAgree] = useState("");
    const [error,setError] = useState();
    const [loading,setLoading] = useState();
    const navigate = useNavigate()
    const {signup} = useAuth();

    async function handleSubmit(e){
        e.preventDefault();

        if(password!==confirmPassword){
            return setError("Password don't match!!")
        }

        try{
            setError("");
            setLoading(true);
            await signup(email,password,username);
            navigate("/");
        }catch(e){
            console.log(e);
            setLoading(false)
            setError(e.message);
        }
    }

    return (
        <Form style={{height : '500px'}} onSubmit={handleSubmit}>
            <TextInput required type="text" placeholder="Enter Name" icon="person" value={username} onChange={(e)=>setUsername(e.target.value)} />
            <TextInput required type="email" placeholder="Enter Email" icon="alternate_email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <TextInput required type="password" placeholder="Enter Password" icon="lock" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <TextInput required type="password" placeholder="Enter Confirm Passowrd" icon="lock_clock" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
            <Checkbox required text="I agree to the Terms &amp; Conditions." value={agree} onChange={(e)=>setAgree(e.target.value)} />
            <Button disabled={loading} type="submit" className="button"><span>Submit Now</span></Button>
            {error && <p className="error">{error}</p>}
            <div className="info">
                Already have an account? <Link to="/login">Login</Link> instead.
            </div>
        </Form>
    )
}

export default SignupForm
