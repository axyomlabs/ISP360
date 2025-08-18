import React, { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import '../css/LoginPage.css'; // Make sure to create this CSS file


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    // Here you would typically handle the login logic (e.g., API call)
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="login-card p-4">
        <div className="text-center mb-4">
          <h2 className="revatix-logo">REVATIX</h2>
        </div>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="light" type="submit" className="login-button">
                Login
              </Button>
            </div>
          </Form>
        </Card.Body>
        <div className="text-center mt-3">
          <a href="#" className="trouble-login">
            Touble login in?
          </a>
        </div>
      </Card>
    </Container>
  );
};

export default LoginPage;