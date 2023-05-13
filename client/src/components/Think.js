import { Button } from '@mui/material';
import React, { Component } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';


class Think extends Component {
    render() {
        const { think , fetchThoughts,serverName } = this.props
        const { format } = require('date-fns');
        const formattedDate = format(new Date(think.date), 'dd/MM/yyyy HH:mm:ss');
        
        const deleteThink = (()=>{
            axios.delete(serverName + '/api/thoughts/delete/' + think.id).then((res)=>{
                fetchThoughts();
            })
        })

        return (
            <li className='thinkLine'>
                <span>{formattedDate}</span>
                <p>{think.message}</p>
                <Button onClick={deleteThink} variant='contained' color='error' ><DeleteIcon/></Button>
            </li>
        );
    }
}

export default Think;