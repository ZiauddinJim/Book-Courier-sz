import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../firebase/firebase.config';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(null)

    const googleSignInFun = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }
    const signOutFun = () => {
        setLoading(true)
        return signOut(auth)
    }
    const registerUserFun = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateProfileFun = (user, updatedUser) => {
        setLoading(true);
        // console.log(updatedUser);
        return updateProfile(user, updatedUser)
    }
    const signInFun = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    const resetPasswordFun = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const userInfo = {
        user,
        setUser,
        loading,
        setLoading,
        email, setEmail,
        googleSignInFun,
        signOutFun,
        registerUserFun,
        updateProfileFun,
        signInFun,
        resetPasswordFun
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => unSubscribe()
    }, [])
    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;