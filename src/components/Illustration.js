import React from 'react'
import classes from '../styles/Illustration.module.css'
function Illustration({image}) {
    return (
        <div className={classes.illustration}>
            <img src={image} alt="Sign up"/>
        </div>
    )
}

export default Illustration
