import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback } from 'react'

import { useLocalStorage } from '../../hooks'
import { useContacts, useAuth, useSocket } from '../../context';

const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    arr1.sort();
    arr2.sort();
    return arr1.every((element, index) => element === arr2[index]);
};

const ConversationsContext = createContext();

const ConversationsProvider = ({ children }) => {
    const [conversations, setConversations] = useLocalStorage('conversations', []);
    const [selectedConversationId, setSelectedConversationId] = useState(0);
    const { contacts } = useContacts();
    const { socket } = useSocket();
    const { currentUser: { email: id = '' } = {} } = useAuth();

    const createConversation = (recipients) => {
        setConversations((prevState) => [...prevState, { recipients, messages: [] }]);
    };

    const formattedConversations = conversations.map(({ recipients, messages }) => {
        const formattedRecipients = recipients.map((recipient) => {
            const contact = contacts.find((contact) => contact.id === recipient);
            const name = (contact && contact.name) || recipient;
            return { id: recipient, name };
        });

        const formattedMessages = messages.map((message) => {
            const contact = contacts.find((contact) => contact.id === message.sender);
            const name = (contact && contact.name) || message.sender;
            const fromMe = id === message.sender;
            return { ...message, senderName: name, fromMe }
        })

        return { ...conversations, recipients: formattedRecipients, messages: formattedMessages };
    })

    const addMessageToConversation = useCallback(({ recipients, sender, text }) => {
        setConversations((prevState) => {
            let newConversation = true;
            const newMessage = { sender, text };
            const newConversations = prevState.map((conversation) => {
                if (arraysEqual(conversation.recipients, recipients)) {
                    newConversation = false;
                    return {
                        ...conversation,
                        messages: [...conversation.messages, newMessage]
                    }
                }
                return conversation;
            });

            if (!newConversation) {
                return newConversations;
            } else {
                return [
                    ...prevState,
                    { recipients, messages: [newMessage] }
                ]
            }
        })
    }, [setConversations]);

    const sendMessage = (recipients, text) => {
        socket.emit('send-message', { recipients, text });
        addMessageToConversation({ recipients, sender: id, text });
    };

    useEffect(() => {
        if (!socket) return;

        socket.on('receive-message', addMessageToConversation)

        return () => socket.off('receive-message');
    }, [socket, addMessageToConversation]);

    const ctx = {
        conversations,
        createConversation,
        formattedConversations,
        selectedConversationId,
        selectedConversation: formattedConversations[selectedConversationId],
        setSelectedConversationId,
        sendMessage,
        addMessageToConversation,
    };

    return (
        <ConversationsContext.Provider value={ctx}>{children}</ConversationsContext.Provider>
    );
}

export const useConversations = () => useContext(ConversationsContext);

export default ConversationsProvider;