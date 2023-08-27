import React from 'react'
import classes from '../styles/Loader.module.css'
function Loader({loading}) {
    return (
        <div className={`${classes.wrapper} ${loading}`}>
            <div className={`${classes.ball} ${classes.blue}`}></div>
            <div className={`${classes.ball} ${classes.red}`}></div>
            <div className={`${classes.ball} ${classes.yellow}`}></div>
            <div className={`${classes.ball} ${classes.green}`}></div>
        </div>
    )
}

export default Loader
