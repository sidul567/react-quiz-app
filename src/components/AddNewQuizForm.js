import React, { createRef, useEffect, useRef, useState } from 'react';
import classes from '../styles/Answers.module.css'
import TextInput from './TextInput';

function AddNewQuizForm({qno,parentCallback}) {
    const buttonRef = useRef([]);
    const tempArray = Array(10).fill(5);
    const [title,setTitle] = useState("");
    buttonRef.current = tempArray.map(
      (ref, index) =>   buttonRef.current[index] = createRef()
      )
    const [options,setOptions] = useState({
      "0": {title:""},
      "1": {title:""},
      "2": {title:""},
      "3": {title:""},
      "4": {title:""},
      "5": {title:""},
      "6": {title:""},
      "7": {title:""},
      "8": {title:""},
      "9": {title:""}
    });
    const [answers,setAnswers] = useState({
      "0": {correct:false,title:""},
      "1": {correct:false,title:""},
      "2": {correct:false,title:""},
      "3": {correct:false,title:""},
      "4": {correct:false,title:""},
      "6": {correct:false,title:""},
      "7": {correct:false,title:""},
      "8": {correct:false,ttitle:""},
      "5": {correct:false,itle:""},
      "9": {correct:false,title:""}
    });
    useEffect(()=>{
      parentCallback(options,answers,title,qno);
    },[options,answers])
    function handleChange(e){
      const newOption = {title:e.target.value}
      setOptions((prevOptions)=>{
        return {...prevOptions, [e.target.name]: newOption}
      })
      const newAnswer = {...answers[e.target.name],title:e.target.value}
      setAnswers((prevAnswer)=>{
        return {...prevAnswer, [e.target.name]:newAnswer}
      })
    }
    function handleClick(e){
      buttonRef.current[e.target.parentNode.firstChild.name].current.classList.add("check");
      const newAnswer = {...answers[e.target.parentNode.firstChild.name], correct:true}
      setAnswers((prevAnswer)=>{
        return {...prevAnswer, [e.target.parentNode.firstChild.name]:newAnswer}
      })
    }
  return <>
    <br/>
    <TextInput type="text" style={{"fontWeight":"700"}} icon="check_circle" value={title} placeholder={`${Number(qno)+1}. Question Title`} onChange={(e)=>setTitle(e.target.value)} />
    <div className={classes.answers}>
        <TextInput required dom={buttonRef.current[0]} handleClick={handleClick} type="text" name="0" placeholder="Option 1" icon="check_circle" value={options.option1} onChange={handleChange}/>
        <TextInput required dom={buttonRef.current[1]} handleClick={handleClick} type="text" name="1" placeholder="Option 2" icon="check_circle" value={options.option2} onChange={handleChange}/>
        <TextInput required dom={buttonRef.current[2]} handleClick={handleClick} type="text" name="2" placeholder="Option 3" icon="check_circle" value={options.option3} onChange={handleChange}/>
        <TextInput required dom={buttonRef.current[3]} handleClick={handleClick} type="text" name="3" placeholder="Option 4" icon="check_circle" value={options.option4} onChange={handleChange}/>
        <TextInput required dom={buttonRef.current[4]} handleClick={handleClick} type="text" name="4" placeholder="Option 5" icon="check_circle" value={options.option5} onChange={handleChange}/>
        <TextInput required dom={buttonRef.current[5]} handleClick={handleClick} type="text" name="5" placeholder="Option 6" icon="check_circle" value={options.option6} onChange={handleChange}/>
        <TextInput required dom={buttonRef.current[6]} handleClick={handleClick} type="text" name="6" placeholder="Option 7" icon="check_circle" value={options.option7} onChange={handleChange}/>
        <TextInput required dom={buttonRef.current[7]} handleClick={handleClick} type="text" name="7" placeholder="Option 8" icon="check_circle" value={options.option8} onChange={handleChange}/>
        <TextInput required dom={buttonRef.current[8]} handleClick={handleClick} type="text" name="8" placeholder="Option 9" icon="check_circle" value={options.option9} onChange={handleChange}/>
        <TextInput required dom={buttonRef.current[9]} handleClick={handleClick} type="text" name="9" placeholder="Option 10" icon="check_circle" value={options.option10} onChange={handleChange}/>
    </div>
  </>;
}

export default AddNewQuizForm;
