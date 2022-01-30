import { useEffect, useState } from 'react'
import {getDatabase,ref,query,get,orderByKey} from 'firebase/database'
function useAnswers(videoID) {
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [answers,setAnswers] = useState([]);
    useEffect(()=>{
        async function fetchVideos(){
            //database related works
            const db = getDatabase();
            const answerRef = ref(db,"answers/"+videoID+"/questions");
            const answerQuery = query(
                answerRef, 
                orderByKey()
            )

            try{ 
                setError(false);
                setLoading(true);
                // request firebase database
                const snapshot = await get(answerQuery);
                setLoading(false);
                if(snapshot.exists()){
                    setAnswers((prevQuestion)=>{
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
    return {answers,loading,error}
}

export default useAnswers
