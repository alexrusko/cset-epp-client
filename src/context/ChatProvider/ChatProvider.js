import React, { useContext, useState, useCallback, useMemo, useEffect } from 'react';

import io from 'socket.io-client';

import ChatContext from './ChatContext';

const ChatProvider = ({ children }) => {
    const [rooms, setRooms] = useState([]);
    const [username, setUsername] = useState(window.localStorage.getItem('username') || '');
    const [messages, setMessages] = useState({});
    const socket = io('http://localhost:8000');

    const createRoom = useCallback((name) => {
        fetch(`http://localhost:8000/createRoom/${name}`, {
            method: 'POST',
        })
        .then((res) => res.json())
        .then((newRoom) => setRooms((prevState) => [...prevState, newRoom]))
        .catch((error) => console.log(error));
    }, []);

    const getRooms = useCallback(() => {
        fetch('http://localhost:8000/rooms')
        .then((res) => res.json())
        .then((data) => setRooms(data))
        .catch((error) => console.log(error));
    }, []);

    const joinRoom = useCallback((roomId, username) => {
        if (username) {
            socket.emit('join-room', { username, roomId });
        }
    }, [socket]);

    const leaveRoom = useCallback((roomId, username) => {
        socket.emit('leave-room', { username, roomId });
    }, [socket]);

    useEffect(() => {
        socket.on('user-connected', ({ username, roomId, timestamp }) => {
            setMessages((prevState) => {
                return {
                    ...prevState,
                    [roomId]: [...(prevState?.[roomId] || []),
                    { from: username, text: `${username} csatlakozott`, timestamp }]
                }
            })
        });

        socket.on('user-disconnected', ({ username, roomId, timestamp }) => {
            setMessages((prevState) => {
                return {
                    ...prevState,
                    [roomId]: [...(prevState?.[roomId] || []),
                    { from: username, text: `${username} kilépett`, timestamp }]
                }
            })
        });
    }, [socket]);

    useEffect(() => {
        getRooms();
    }, [getRooms])

    const ctx = useMemo(() => ({
        createRoom,
        getRooms,
        rooms,
        username,
        messages,
        setUsername,
        joinRoom,
        leaveRoom,
    }), [createRoom, getRooms, rooms, username, messages, setUsername, joinRoom, leaveRoom]);

    return <ChatContext.Provider value={ctx}>{children}</ChatContext.Provider>
}

export const useChat = () => useContext(ChatContext);

export default ChatProvider;