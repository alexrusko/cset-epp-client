import React, { useState, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap';

import { useConversations } from '../../context'

const Chat = () => {
    const [text, setText] = useState('');
    const { sendMessage, selectedConversation: { recipients, messages } } = useConversations();
    const setRef = useCallback((node) => {
        if (node) {
            node.scrollIntoView({ smooth: true })
        }
    }, []);

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const recipientIds = recipients.map((recipient) => recipient.id);
        sendMessage(recipientIds, text);
        setText('');
    }

    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column align-items-start justify-content-end px-3">
                    {messages.map(({text, senderName, fromMe}, index) => {
                        const lastMessage = messages.length - 1 === index;
                        return (
                            <div 
                                ref={lastMessage ? setRef : null}
                                key={index}
                                className={`my-1 d-flex flex-column
                                    ${fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
                            >
                                <div 
                                className={`rounded px-2 py-1 ${fromMe ? 'bg-primary text-white' : 'border'}`}>
                                    {text}
                                </div>
                                <div className={`text-muted small ${fromMe ? 'text-right' : ''}`}>
                                    {fromMe ? 'Te' : senderName}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <InputGroup>
                        <Form.Control
                            type="textarea"
                            required value={text}
                            onChange={handleTextChange}
                            style={{ height: '75px', resize: 'none' }}
                        />
                        <InputGroup.Append>
                            <Button type="submit">Küldés</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Chat;
