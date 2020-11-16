import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap';

import { useContacts, useConversations } from '../../context';

export default function NewConversationModal({ closeModal }) {
    const [selectedContactIds, setSelectedContactIds] = useState([]);
    const { contacts } = useContacts();
    const { createConversation } = useConversations();

    const handleCheckboxChange = (contactId) => {
        setSelectedContactIds((prevState) => {
            if (prevState.includes(contactId)) {
                return prevState.filter((id) => id !== contactId);
            } else {
                return [...prevState, contactId];
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createConversation(selectedContactIds);
        closeModal();
    };

    return (
        <>
            <Modal.Header closeButton>Csevegés létrehozása</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.length ? contacts.map((contact) => (
                        <Form.Group controlId={contact.id} key={contact.id}>
                            <Form.Check 
                                type="checkbox"
                                value={selectedContactIds.includes(contact.id)}
                                label={contact.name}
                                onChange={handleCheckboxChange.bind(null, contact.id)}
                            />
                        </Form.Group>
                    )) : <p>Nincs még barátod</p>}
                    {!!contacts.length && <Button type="submit">Létrehozás</Button>}
                </Form>
            </Modal.Body>
        </>
    );
};
