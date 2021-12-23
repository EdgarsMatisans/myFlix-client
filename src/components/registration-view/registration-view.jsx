import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Route from "react-router-dom"
import Router from "react-router-dom"
import BrowserRouter from "react-router-dom";
import Container from 'react-bootstrap';
// SCSS Import
// import "./registration-view.scss"

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://mysterious-refuge-92228.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        })
            .then((response) => {
                const data = response.data;
                console.log(data)
                window.open('/', '_self');
            })
            .catch(function (error) {
                console.log('error registering the user');
            });
    };

    return (
        <Container>
            <Form>

                <Form.Group
                    controlId="formBasicUsername">
                    <Form.Label>
                        Username:
                    </Form.Label>
                    <Form.Control
                        className="username"
                        value={username}
                        type="text"
                        placeholder="Create Username"
                        onChange={e =>
                            setUsername(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group
                    controlId="formBasicPassword">
                    <Form.Label>
                        Password:
                    </Form.Label>
                    <Form.Control
                        className="password"
                        value={password}
                        type="text"
                        placeholder="Create Password"
                        onChange={e =>
                            setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group
                    controlId="formBasicBirthday">
                    <Form.Label>
                        Birthday:
                    </Form.Label>
                    <Form.Control
                        className="birthday"
                        value={birthday}
                        type="date"
                        placeholder="Enter Birthday"
                        onChange={e =>
                            setBirthday(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group
                    controlId="formBasicEmail">
                    <Form.Label>
                        Email:
                    </Form.Label>
                    <Form.Control
                        className="email"
                        value={email}
                        type="email"
                        placeholder="Enter Email"
                        onChange={e =>
                            setEmail(e.target.value)}>
                    </Form.Control>
                    <Form.Text
                        className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group
                    controlId="formBasicCheckbox">
                    <Form.Check
                        type="checkbox"
                        label="Check me out" />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}
