import React, { useEffect, useState } from 'react';
import Form from './Form';
import TextInput from './TextInput';
import Button from './Button';
import { get, getDatabase, limitToLast, orderByKey, query, ref, set} from 'firebase/database';

function AddNewVideoForm() {
    const [noq,setNoq] = useState("");
    const [videoTitle,setVideoTitle] = useState("");
    const [youtubeID,setYoutubeID] = useState("");
    const [lastKey,setLastKey] = useState([]);
    const [sendRequest,setSendRequest] = useState(false);
    const [submit,setSubmit] = useState(false);

    useEffect(()=>{
        (async function searchLastVideoKey(){
            const db = getDatabase();
            const searchVideoRef = ref(db,"videos");
            const videoQuery = query(
                searchVideoRef,
                orderByKey(),
                limitToLast(1)
            )
            try{
                const snapshot = await get(videoQuery);
                if(snapshot.exists()){
                    setLastKey(Object.keys(snapshot.val()))
                }
            }
            catch(e){
                console.log(e)
            }
            setSendRequest(false);
        })()
    },[sendRequest])

    async function handleSubmit(e){
        e.preventDefault();
        setSendRequest(true);
        const db = getDatabase();
        const videoRef = ref(db,"videos/"+(Number(lastKey[0])+1));
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
            setTimeout(()=>{
                setSubmit(false);
            },2000)
        }catch(e){
            console.log(e)
        }
    }
  return (
      <Form style={{height:'350px'}} onSubmit={handleSubmit}>
          <TextInput required type="text" placeholder="Number Of Questions" icon="pin" value={noq} onChange={(e)=>setNoq(e.target.value)}/>
          <TextInput required type="text" placeholder="Video Title" icon="play_circle_filled" value={videoTitle} onChange={(e)=>setVideoTitle(e.target.value)}/>
          <TextInput required type="text" placeholder="Youtube ID" icon="lightbulb" value={youtubeID} onChange={(e)=>setYoutubeID(e.target.value)}/>
          <Button type="submit" className="button"><span>Add New Video</span></Button>
          {submit && <p className="success">Video added successfully!!</p> }
      </Form>
  )
}

export default AddNewVideoForm;
