import { useEffect, useState } from 'react'
import {getDatabase,ref,query,get,orderByKey} from 'firebase/database'
function useQuestions(videoID) {
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [questions,setQuestions] = useState([]);
    useEffect(()=>{
        async function fetchVideos(){
            //database related works
            const db = getDatabase();
            const quizRef = ref(db,"quiz/"+videoID+"/questions");
            const quizQuery = query(
                quizRef, 
                orderByKey()
            )

            try{ 
                setError(false);
                setLoading(true);
                // request firebase database
                const snapshot = await get(quizQuery);
                setLoading(false);
                if(snapshot.exists()){
                    setQuestions((prevQuestion)=>{
                        return [...prevQuestion,...Object.values(snapshot.val())]
                    })
                }
            }catch(e){
                setLoading(false)
                setError(true)
            }

        }
        fetchVideos();
    },[videoID])
    return {questions,loading,error}
}

export default useQuestions
