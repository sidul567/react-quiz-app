import React from 'react'
import successImage from '../assets/images/success.png'
import useFetch from '../hooks/useFetch'
import classes from '../styles/Summary.module.css'
import Loader from './Loader'
function Summary({score,noq}) {
    console.log(score)
    const getKeyword = ()=>{
        if(score*100/(noq*5) ===100)
            return "wow"
        else if(score*100/(noq*5) >=70)
            return "excellent"
        else if(score*100/(noq*5) >=40)
            return "good"
        else 
            return "fail"  
    }
    const {loading,error,result} = useFetch(`https://api.pexels.com/v1/search?query=${getKeyword()}&per_page=1`,"GET",{
        Authorization: process.env.REACT_APP_PIXELS_API_KEY
    })
    const image = result?result.photos[0].src.medium:successImage
    return (
        <div className={classes.summary}>
            <div className={classes.point}>
                <p className={classes.score}>
                    Your score is <br/> {score} out of {noq*5}
                </p>
            </div>
            {loading && <Loader loading="imageLoading" />}
            {error && <div className={classes.badge}>An error occured!</div>}
            {!loading && !error && (
                <div className={classes.badge}>
                    <img src={image} alt="Success"/>
                </div>
            )}
            
        </div>
    )
}

export default Summary
