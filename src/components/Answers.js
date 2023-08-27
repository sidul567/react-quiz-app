import React, { Fragment } from 'react'
import classes from '../styles/Answers.module.css'
import Checkbox from './Checkbox'

function Answers({options=[],handleChange,input}) {
    return (
        <div className={classes.answers}>
            {
                options.map((option,index)=>(
                    <Fragment key={index}>
                        {
                            input?(
                                <Checkbox 
                                    key = {index}
                                    className={classes.answer} 
                                    text={option.title}
                                    value={index}
                                    onChange = {(e)=>handleChange(e,index)}
                                    checked = {option.checked}
                                />
                            ):(
                                <Checkbox 
                                    key = {index}
                                    className={`${classes.answer} 
                                    ${
                                        option.correct
                                        ?classes.correct
                                        :option.checked
                                        ?classes.wrong
                                        :null}`} 
                                    text={option.title}
                                    defaultChecked = {option.checked}
                                    disabled
                                />      
                            )
                        }
                    </Fragment>
                    
                ))
            }
            
        </div>
    )
}

export default Answers