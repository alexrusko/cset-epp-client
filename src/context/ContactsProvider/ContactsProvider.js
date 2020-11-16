import React, { createContext, useContext } from 'react'

import { useLocalStorage } from '../../hooks'

const ContactsContext = createContext()

const ContactsProvider = ({ children }) => {
    const [contacts, setContacts] = useLocalStorage('contacts', []);

    const createContact = (id, name) => {
        setContacts((prevState) => [...prevState, { id, name }]);
    }

    const ctx = {
        contacts,
        createContact,
    }

    return (
        <ContactsContext.Provider value={ctx}>{children}</ContactsContext.Provider>
    )
}

export const useContacts = () => useContext(ContactsContext);

export default ContactsProvider;