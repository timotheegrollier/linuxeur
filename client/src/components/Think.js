import React, { Component } from 'react';

class Think extends Component {
    render() {
        const { think } = this.props
        const { format } = require('date-fns');
        const formattedDate = format(new Date(think.date), 'dd/MM/yyyy HH:mm:ss');

        return (
            <li>
                <span>{formattedDate}</span>
                <p>{think.message}</p>
            </li>
        );
    }
}

export default Think;