import { get, getDatabase, query, ref, set } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import Button from './Button';
import Form from './Form';
import TextInput from './TextInput';

function UpdateVideoForm() {
    const [videoTitle,setVideoTitle] = useState("");
    const [noq,setNoq] = useState("");
    const [youtubeID,setYoutubeID] = useState("");
    const [videoNo,setVideoNo] = useState("");
    const [submit,setSubmit] = useState(false);

    useEffect(()=>{
        (async function searchLastVideoKey(){
            const db = getDatabase();
            const searchVideoRef = ref(db,"videos/"+videoNo);
            const videoQuery = query(
                searchVideoRef,
            )
            try{
                const snapshot = await get(videoQuery);
                if(videoNo==""){
                    setNoq("");
                    setVideoTitle("");
                    setYoutubeID("");
                }
                else if(snapshot.exists()){
                    setNoq(Object.values(snapshot.val())[0]);
                    setVideoTitle(Object.values(snapshot.val())[1]);
                    setYoutubeID(Object.values(snapshot.val())[2]);
                }
            }
            catch(e){
                console.log(e)
            }
        })()
    },[videoNo])

    function handleSubmit(e){
        e.preventDefault();
        const db = getDatabase();
        const videoRef = ref(db,"videos/"+videoNo);
        try{
            set(videoRef,{
                noq,
                title: videoTitle,
                youtubeID
            })
            setSubmit(true);
            setNoq("");
            setVideoTitle("");
            setYoutubeID("");
            setVideoNo("");
        }catch(e){
            console.log(e)
        }
    }
  return (
    <Form style={{height:'400px'}} onSubmit={handleSubmit}>
        <TextInput required type="text" placeholder="Video No" icon="pin" value={videoNo} onChange={(e)=>{setVideoNo(e.target.value);setSubmit(false);}}/>
        <TextInput required type="text" placeholder="Number Of Questions" icon="pin" value={noq} onChange={(e)=>setNoq(e.target.value)}/>
        <TextInput required type="text" placeholder="Video Title" icon="play_circle_filled" value={videoTitle} onChange={(e)=>setVideoTitle(e.target.value)}/>
        <TextInput required type="text" placeholder="Youtube ID" icon="lightbulb" value={youtubeID} onChange={(e)=>setYoutubeID(e.target.value)}/>
        <Button type="submit" className="button"><span>Update Video</span></Button>
        {submit && <p className="success">Video updated successfully!!</p> }
    </Form>
    );
}

export default UpdateVideoForm;
