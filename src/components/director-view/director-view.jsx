import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';


import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';



import "./director-view.scss";

export function DirectorView(props) {
    const { director } = props;
    console.log(director);
    return (
        <div className="director-view">
            <div className="director-name">
                <span className="label">Name: </span>
                <span className="value">{director.Name}</span>

            </div>
            <div className="director-bio">
                <span className="label">Biography: </span>
                <span className="value">{director.Bio}</span>
            </div>
            <div className="director-birthyear">
                <span className="label">Birth: </span>
                <span className="value">{director.Born}</span>
            </div>
            <button onClick={() => { onBackClick(null); }}>Back</button>s
        </div>
    )
}