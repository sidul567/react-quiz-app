import { get, getDatabase, ref, remove } from 'firebase/database';
import React, { useState } from 'react';
import Button from './Button';
import Form from './Form';
import TextInput from './TextInput';

function DeleteVideoForm() {
    const [videoNo,setVideoNo] = useState("");
    const [submit,setSubmit] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [text,setText] = useState("");
    async function handleSubmit(e){
        e.preventDefault();

        const db = getDatabase();
        const deleteQuery = ref(db,"videos/"+videoNo);
        try{
            const snapshot = await get(deleteQuery);
            if(snapshot.exists()){
                await remove(deleteQuery)
                setSubmit(true);
                setText("Video deleted successfully!!");
                setTimeout(()=>{
                    setSubmit(false)
                },2000)
            }else{
                setNotFound(true);
                setText("Video can't found!!");
                setTimeout(()=>{
                    setNotFound(false);
                },2000)
            }
            setVideoNo("");
        }catch(e){
            console.log(e)
        }
    } 

  return (
    <Form style={{height:'200px'}} onSubmit={handleSubmit}>
        <TextInput required type="text" placeholder="Video No" icon="pin" value={videoNo} onChange={(e)=>{setVideoNo(e.target.value);setSubmit(false);}}/>
        <Button type="submit" className="button"><span>Delete Video</span></Button>
        {/* {<p className={`${notFound?"d-none":""} success ${submit?"transitionOn":"transitionOff"}`}>Video deleted successfully!!</p> } */}
        {/* {<p className={`error ${notFound?"transitionOn":"transitionOff"}`}>Video deleted successfully!!</p> } */}
        {<p className={`error ${submit?"success":""} ${submit||notFound?"transitionOn":"transitionOff"}`}>{text}</p>
        }
    </Form>
    );
}

export default DeleteVideoForm;
