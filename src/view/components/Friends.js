import React, { useState } from 'react';
import { ListGroup, Button, Modal } from 'react-bootstrap';

import { useContacts } from '../../context'

import AddFriendModal from './AddFriendModal';

const Friends = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const { contacts } = useContacts();

    const openModalHandler = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="d-flex flex-column justify-content-between h-100">
            <div>
                <ListGroup variant="flush">
                    {contacts.map((contact) => (
                        <ListGroup.Item key={contact.id}>
                            {contact.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
            <Button className="rounded-0" onClick={openModalHandler}>
                Barát hozzáadása
            </Button>

            <Modal show={modalOpen} onHide={closeModal}>
                <AddFriendModal closeModal={closeModal}/>
            </Modal>
        </div>
    );
};

export default Friends;