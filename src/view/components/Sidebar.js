import React, { useState } from 'react';

import { Tab, Nav } from 'react-bootstrap';
import { useAuth } from '../../context';

import Conversations from './Conversations';
import Friends from './Friends';

const eventKeys = {
    CONVERSATIONS: 'conversations',
    FRIENDS: 'friends',
};

const Sidebar = () => {
    const [activeKey, setActiveKey] = useState(eventKeys.CONVERSATIONS);
    const { currentUser: { email: id = '' } = {}, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div style={{ width: '250px' }} className="d-flex flex-column">
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant="tabs" className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey={eventKeys.CONVERSATIONS}>
                            Beszélgetések
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={eventKeys.FRIENDS}>
                            Barátok
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={eventKeys.CONVERSATIONS} className="h-100">
                        <Conversations/>
                    </Tab.Pane>
                    <Tab.Pane eventKey={eventKeys.FRIENDS} className="h-100">
                        <Friends/>
                    </Tab.Pane>
                </Tab.Content>
                <div className="p-2 border-top border-right small">
                    Bejelentkezve: <span className="text-muted">{id}</span>
                </div>
                <div className="p-2 border-top border-right small" style={{ cursor: 'pointer' }} onClick={handleLogout}>
                    Kijelentkezés
                </div>
            </Tab.Container>
        </div>
    )
};

export default Sidebar;