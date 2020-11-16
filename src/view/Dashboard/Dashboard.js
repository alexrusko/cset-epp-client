import React from 'react';

import { Sidebar, Chat } from '../components';
import { useConversations } from '../../context';


const Dashboard = (props) => {
    const { selectedConversation } = useConversations();
    return (
        <div className="d-flex" style={{ height: '100vh' }}>
            <Sidebar />
            {selectedConversation && <Chat/>}
        </div>
    )
};

export default Dashboard;