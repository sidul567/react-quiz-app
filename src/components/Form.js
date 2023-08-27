import React from 'react'
import classes from '../styles/Form.module.css'
function Form({children,className,...rest}) {
    return (
        <form action="#" className={`${className} ${classes.form}`} {...rest}>
            {children}
        </form>
    )
}

export default Form
