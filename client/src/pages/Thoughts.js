
import React, { useEffect, useRef, useState } from 'react';
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
    const serverPort = window.location.hostname === "88.179.96.117" ? 16384 : 80
    const serverName = `http://${window.location.hostname}:${serverPort}`
    const socketRef = useRef()
    
    useEffect(() => {
        fetchThoughts();
        // eslint-disable-next-line
        
        // Création de l'instance WebSocket et connexion au serveur
        socketRef.current = new WebSocket('ws://88.179.96.117:16999/websocket')
       let socket = socketRef.current

        // Écoute des événements WebSocket
        socket.onopen = () => {
            console.log('Connexion WebSocket établie');
        };

        socket.onmessage = (event) => {
            console.log('Message reçu du serveur WebSocket :', event.data);
            // Faites ce que vous devez faire avec le message reçu du serveur


            switch (event.data) {
                case "fetchMsg":
                    fetchThoughts()
            }
        };

        socket.onclose = () => {
            console.log('Connexion WebSocket fermée');
        };


        // Retourner une fonction de nettoyage pour fermer la connexion WebSocket lors de la suppression du composant
        return () => {
            socket.close();
        };
    }, [])

    const sendThink = (() => {
        axios.post(serverName + '/api/thoughts/new', think).then((res) => {
            setThink("")
            setButtonState(true)
            socketRef.current.send('newMsg')
        })
    })


    const fetchThoughts = (() => {
        axios.get(serverName + '/api/thoughts/list').then((res) => {
            setThoughts(res.data.thoughts.reverse())
        })
    })

    const deleteThink = ((id)=>{
        axios.delete(serverName + '/api/thoughts/delete/' + id).then((res)=>{
            socketRef.current.send('deleted');
        })
    })


    return (
        <div id='Thoughts'>
            <h2>Your thoughts:</h2>
            <CustomTextArea setButtonState={setButtonState} think={think} setThink={setThink} />
            <Button onClick={sendThink} variant='contained' disabled={buttonState}>Send</Button>
            <ul id='thoughts-list'>
                {thoughts && (
                    thoughts.map((el, key) => {
                        return <Think think={el} key={key} deleteThink={deleteThink} serverName={serverName} />
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