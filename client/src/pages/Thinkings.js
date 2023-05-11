
import React, {  useEffect, useState } from 'react';
import CustomTextArea from '../components/layouts/CustomTextArea'
import Button from '@mui/material/Button';
import axios from 'axios'
import Think from '../components/Think';

const Thinkings = () => {
        const [buttonState,setButtonState] = useState(true)
        const [think,setThink] = useState()
        const [thoughts,setThoughts] = useState([])


        useEffect(()=>{
            fetchThoughts();
        },[])
        
        const sendThink = (()=>{
            axios.post('http://localhost:8000/api/new_think',think).then((res)=>{
                setThink("")
                setButtonState(true)
                fetchThoughts()
                console.log(res);
            })
        })


        const fetchThoughts = (()=>{
            axios.get('http://localhost:8000/api/thoughts/list').then((res)=>{
                console.log(res.data);
                setThoughts(res.data.thoughts)
            })
        })


    return (
        <div>
        <h2>Your thougths:</h2>
        <CustomTextArea setButtonState={setButtonState} think={think} setThink={setThink}/>
        <Button onClick={sendThink} variant='contained' disabled={buttonState}>Send</Button>
        <ul>
                {thoughts && (
                    thoughts.map((el)=>{
                        return <Think think={el}/>
                    })
                )}
        </ul>
    </div>
    );
};



export default Thinkings;