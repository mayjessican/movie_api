import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./login-view.scss";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import serverUrl from "../../helpers";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios
      .post(`${serverUrl}/login`, {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log('login error', e);
        alert("no such user");
      });

  };
  return (
    <Container>
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>{" "}
        {/* <Link to={`/register`}>
          <Button variant='dark link' type="submit" onClick={handleSubmit}>
            Register Here
          </Button>
        </Link> */}
        <Button
          variant="dark link"
          type="submit"
          onClick={() => props.onRegister(true)}
        >
          Register Here
        </Button>
      </Form>
    </Container>
  );
}
