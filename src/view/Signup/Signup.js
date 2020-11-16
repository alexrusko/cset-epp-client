import React, { useRef, useState } from 'react';
import { withRouter } from "react-router-dom";
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

import { useAuth } from '../../context'; 

const Signup = ({ history }) => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [error, setError] = useState('');
    const { signup } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            setError('A jelszó nem egyezik.');
            return;
        }

        signup(emailRef.current.value, passwordRef.current.value)
        .then(() => {
            emailRef.current.value = '';
            passwordRef.current.value = '';
            confirmPasswordRef.current.value = '';
            history.push('/');
        })
        .catch((error) => setError(error.message));
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{height: '100vh'}}>
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
                        <Form.Group>
                            <Form.Label>Jelszó mégegyszer</Form.Label>
                            <Form.Control type="password" ref={confirmPasswordRef} required></Form.Control>
                        </Form.Group>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Button type="submit" className="mr-2">Regisztráció</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default withRouter(Signup);