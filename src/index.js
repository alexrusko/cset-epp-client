import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

import {
  AuthProvider,
  ContactsProvider,
  ConversationsProvider,
  SocketProvider } from './context';

ReactDOM.render(
  <AuthProvider>
    <SocketProvider>
    <ContactsProvider>
      <ConversationsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConversationsProvider>
    </ContactsProvider>
    </SocketProvider>
  </AuthProvider>,
  document.getElementById('root')
);
