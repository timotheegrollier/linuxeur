
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
    const serverPort = window.location.hostname === "localhost" ? 80 : 16384
    const serverName = `http://${window.location.hostname}:${serverPort}` 


    useEffect(() => {
        fetchThoughts();
        // eslint-disable-next-line
    }, [])

    const sendThink = (() => {
        axios.post(serverName + '/api/thoughts/new', think).then((res) => {
            setThink("")
            setButtonState(true)
            fetchThoughts()
            
            console.log(res);
        })
    })


    const fetchThoughts = (() => {
        axios.get(serverName + '/api/thoughts/list').then((res) => {
            console.log(res.data);
            console.log(window.location.host);
            setThoughts(res.data.thoughts.reverse())
        })
    })


    return (
        <div id='Thoughts'>
            <h2>Your thoughts:</h2>
            <CustomTextArea setButtonState={setButtonState} think={think} setThink={setThink} />
            <Button onClick={sendThink} variant='contained' disabled={buttonState}>Send</Button>
            <ul id='thoughts-list'>
                {thoughts && (
                    thoughts.map((el,key) => {
                        return <Think think={el} key={key} fetchThoughts={fetchThoughts} serverName={serverName}/>
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