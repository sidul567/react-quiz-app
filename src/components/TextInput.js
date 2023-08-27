import React from 'react'
import classes from '../styles/TextInput.module.css'
function TextInput({icon, handleClick,dom,...rest}) {
    return (
        <div className={classes.textInput}>
            <input {...rest}/>
            <span className="material-icons-outlined" ref={dom} onClick={(e)=>handleClick(e)} >{icon}</span>
        </div>
    )
}

export default TextInput
