import React, { useState } from 'react';
import { Button, Modal, ListGroup } from 'react-bootstrap';

import { useConversations } from '../../context'

import NewConversationModal from './NewConversationModal';

const Conversations = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const { formattedConversations, selectedConversationId, setSelectedConversationId } = useConversations();

    const openModalHandler = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <div className="d-flex flex-column justify-content-between h-100">
            <div>
                <ListGroup variant="flush">
                    {formattedConversations.map((conversation, index) => (
                        <ListGroup.Item
                            key={index}
                            active={index === selectedConversationId}
                            action
                            onClick={setSelectedConversationId.bind(null, index)}>
                            {conversation.recipients.map((recipient) => recipient.name).join(', ')}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
            <Button className="rounded-0" onClick={openModalHandler}>
                Csevegés létrehozása
            </Button>

            <Modal show={modalOpen} onHide={closeModal}>
                <NewConversationModal closeModal={closeModal}/>
            </Modal>
        </div>
    )
}

export default Conversations;