import React, { useState, useEffect, createContext, useContext } from 'react';

import { firebaseAuth } from './firebase';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentuser] = useState();

    const signup = (email, password) => {
        return firebaseAuth.createUserWithEmailAndPassword(email, password);
    };

    const login = (email, password) => {
        return firebaseAuth.signInWithEmailAndPassword(email, password);
    };

    const logout = () => {
        return firebaseAuth.signOut();
    };

    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                //user.getIdToken(true).then((token) => console.log(token));
                setCurrentuser(user);
            } else {
                setCurrentuser();
            }
        });

        return unsubscribe;
    }, []);

    const ctx = {
        signup,
        login,
        currentUser,
        logout,
    };
    

    return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;