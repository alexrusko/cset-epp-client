import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

import { useAuth } from '../../context'; 

const Login = () => {
    const [error, setError] = useState('');
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(emailRef.current.value, passwordRef.current.value)
        .catch((error) => setError(error.message));
    };

    return (
        <Container className="d-flex align-items-center justify-content-center flex-column" style={{height: '100vh'}}>
            <h1 className="mb-5">Cset Epp</h1>
            <Card className="w-100" style={{ maxWidth: '400px' }}>
                <Card.Body>
                    <Form className="w-100" onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="text" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Jelszó</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Button type="submit" className="mr-2" onClick={handleSubmit}>Belépés</Button>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        <Link to="/signup">Regisztráció</Link>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;