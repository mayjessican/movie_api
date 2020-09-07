import React, {useState} from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

export function UpdateProfile(props) {

    const [Username, updateUsername] = useState('');
    const [Password, updatePassword] = useState('');
    const [Email, updateEmail] = useState('');
    const [Dob, updateDob] = useState('');

    const handleUpdate = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        axios.put(`https://helloworld-test-1234.herokuapp.com/users/${user}`, {
        Username: Username,
        Password: Password,
        Email: Email,
        Birthday: Dob
        }, { headers: { Authorization: `Bearer ${token}` } }
        ).then(response => {
        const data = response.data;
        localStorage.setItem("user", data.Username);
        console.log(data);
        window.open('/', '_self');
        })
        .catch(e => {
        console.log('error updating the user')
        });
        }

    return (
        <Container style={{ width: "42rem" }}>
        <Form>
            <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
                type="text"
                placeholder="Username"
                value={Username}
                onChange={(e) => updateUsername(e.target.value)}
            />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
                type="password"
                placeholder="Password"
                value={Password}
                onChange={(e) => updatePassword(e.target.value)}
            />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
                type="email"
                placeholder="Enter email"
                value={Email}
                onChange={(e) => updateEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
                We will never share your information with anyone
            </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicDob">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
                type="date"
                placeholder="12/31/1999"
                value={Dob}
                onChange={(e) => updateDob(e.target.value)}
            />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleUpdate}>
            Update
            </Button>
        </Form>
        </Container>
    )}
