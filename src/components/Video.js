import React from 'react'
import classes from '../styles/Video.module.css'
import Loader from './Loader'
function Video({title,id,noq,loading}) {
    return (
        <div className={classes.video}>
            {loading && <Loader loading="imageLoading" />}
            {!loading && <img src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt=""/>}
            <p>{title}</p>
            <div className={classes.qmeta}>
                <p>{noq} Questions</p>
                <p>Total Score : {noq*5}</p>
            </div>
        </div>
    )
}

export default Video
