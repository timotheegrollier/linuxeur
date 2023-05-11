
import React, { useEffect, useState } from 'react';
import CustomTextArea from '../components/layouts/CustomTextArea'
import Button from '@mui/material/Button';
import axios from 'axios'
import Think from '../components/Think';
import { useNavigate } from 'react-router-dom';

const Thoughts = () => {
    const [buttonState, setButtonState] = useState(true)
    const [think, setThink] = useState()
    const [thoughts, setThoughts] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        fetchThoughts();
    }, [])

    const sendThink = (() => {
        axios.post('/api/thoughts/new', think).then((res) => {
            setThink("")
            setButtonState(true)
            fetchThoughts()
            console.log(res);
        })
    })


    const fetchThoughts = (() => {
        axios.get('/api/thoughts/list').then((res) => {
            console.log(res.data);
            setThoughts(res.data.thoughts)
        })
    })


    return (
        <div>
            <h2>Your thougths:</h2>
            <CustomTextArea setButtonState={setButtonState} think={think} setThink={setThink} />
            <Button onClick={sendThink} variant='contained' disabled={buttonState}>Send</Button>
            <ul>
                {thoughts && (
                    thoughts.map((el) => {
                        return <Think think={el} />
                    })
                )}
            </ul>

            <Button variant='contained' color='error' onClick={() => {
                navigate('/')
            }}>
                Back
            </Button>
        </div>
    );
};



export default Thoughts;