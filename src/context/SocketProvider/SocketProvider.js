import React, { createContext, useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

import { useAuth } from '../../context';

const serverUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : window.location.origin;

const httpUrlToWebSockeUrl = (url) => {
    return url.replace(/(http)(s)?:\/\//, "ws$2://");
}

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const { currentUser: { email: id = '' } = {} } = useAuth();
    const [socket, setSocket] = useState();

    useEffect(() => {
        const newSocket = io(httpUrlToWebSockeUrl(serverUrl), { query: { id } });
        setSocket(newSocket);

        return () => newSocket.close();
    }, [id]);
    

    const ctx = {
       socket,
    };
    

    return <SocketContext.Provider value={ctx}>{children}</SocketContext.Provider>
}

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;