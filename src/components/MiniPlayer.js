import React, { useRef, useState } from 'react'
import ReactPlayer from 'react-player';
import classes from '../styles/MiniPlayer.module.css'
function MiniPlayer({id,title}) {
    const buttonRef = useRef();
    const [status,setStatus] = useState(true);
    const videoURL = `https://youtube.com/watch?v=${id}`

    const toggleMiniPlayer = ()=>{
        if(status){
            setStatus(false);
            buttonRef.current.classList.remove(classes.floatingBtn);
        }else{
            setStatus(true);
            buttonRef.current.classList.add(classes.floatingBtn);
        }
    }

    return (
        <div className={`${classes.miniPlayer} ${classes.floatingBtn}`} ref={buttonRef} onClick={toggleMiniPlayer}>
            <span className={`material-icons-outlined ${classes.open}`}>{" "}play_circle_filled{" "}</span>
            <span className={`material-icons-outlined ${classes.close}`} onClick={toggleMiniPlayer}>{" "}close{" "}</span>
            <ReactPlayer
                className = {classes.player}
                url = {videoURL}
                width = "300px"
                height = "168px"
                playing = {!status}
                controls
                volume = "0.2"
            />
            <p>{title}</p>
        </div>
    )
}

export default MiniPlayer
