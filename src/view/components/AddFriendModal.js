import React, { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap';

import { useContacts } from '../../context';

export default function AddFriendModal({ closeModal }) {
    const idRef = useRef();
    const nameRef = useRef();
    const { createContact } = useContacts();

    const handleSubmit = (e) => {
        e.preventDefault();
        createContact(idRef.current.value, nameRef.current.value);
        closeModal();
    }

    return (
        <>
            <Modal.Header closeButton>Barát hozzáadása</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type="text" ref={idRef} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Név</Form.Label>
                        <Form.Control type="text" ref={nameRef} required/>
                    </Form.Group>
                    <Button type="submit">Hozzáad</Button>
                </Form>
            </Modal.Body>
        </>
    )
}
