import { Button } from '@mui/material';
import React, { Component } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';


class Think extends Component {
    render() {
        const { think , deleteThink } = this.props
        const { format } = require('date-fns');
        const formattedDate = format(new Date(think.date), 'dd/MM/yyyy HH:mm:ss');
        


        return (
            <li className='thinkLine'>
                <span>{formattedDate}</span>
                <p>{think.message}</p>
                <Button onClick={()=>{
                    deleteThink(think.id)
                }} variant='contained' color='error' ><DeleteIcon/></Button>
            </li>
        );
    }
}

export default Think;