import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { connect } from 'react-redux'

import "./login-view.scss";

export function
    LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        /* Send a request to the server for authentication */
        axios
            .post('https://mysterious-refuge-92228.herokuapp.com/login', {
                Username: username,
                Password: password
            })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('no such user')
            });

    };

    return (
        <Form>
            <Form.Group
                controlId="formUsername">
                <Form.Label>
                    Username:
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={e =>
                        setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group
                controlId="formPassword">
                <Form.Label>
                    Password
                </Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e =>
                        setPassword(e.target.value)} />
            </Form.Group>
            <div
                className="buttons-login">

                <Link
                    to={`/register`}>
                    <Button
                        variant="primary"
                        type="button">

                        Register
                    </Button>
                </Link>
                <Button
                    variant="success link"
                    type="submit"
                    onClick={handleSubmit}>
                    Login
                </Button>
            </div>
        </Form>
    )

}

const mapDispatchToProps = (dispatch) => ({
    handleSubmit: (username, password) => dispatch(handleSubmit(username, password))
});

export default connect(null, mapDispatchToProps)(LoginView);