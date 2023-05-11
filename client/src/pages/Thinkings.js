
import React, {  useState } from 'react';
import CustomTextArea from '../components/layouts/CustomTextArea'
import Button from '@mui/material/Button';
import axios from 'axios'

const Thinkings = () => {
        const [buttonState,setButtonState] = useState(true)
        const [think,setThink] = useState()
        
        const sendThink = (()=>{
            axios.post('http://localhost:8000/api/new_think').then((res)=>{
                setThink("")
                setButtonState(true)
                console.log(res);
            })
        })


    return (
        <div>
        <h2>Your thougths:</h2>
        <CustomTextArea setButtonState={setButtonState} think={think} setThink={setThink}/>
        <Button onClick={sendThink} variant='contained' disabled={buttonState}>Send</Button>
    </div>
    );
};



export default Thinkings;