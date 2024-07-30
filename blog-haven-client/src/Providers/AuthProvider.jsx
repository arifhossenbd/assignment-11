/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import auth from "../Firebase/firebase";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUser = (name, email, photoURL) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name, email: email, photoURL: photoURL
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            const userEmail = { email: currentUser?.email };
            if (createUser) {
                axiosPublic.post('/api/v1/jwt', userEmail, { withCredentials: true })
                    .then(res => {
                        if (res.data.token) {
                            console.log("token", res.data.token);
                        }
                        setLoading(false);
                    })
                    .catch(error => {
                        // Handle token expiration error
                        console.error("Token expired. Logging out...", error);
                        logOut();
                    });
            } else {
                axiosPublic.post('/api/v1/logOut', userEmail, { withCredentials: true })
                    .then(response => {
                        console.log(response.data);
                    });
                setLoading(false);
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [axiosPublic, user?.email])


    const authInfo = {
        user,
        loading,
        createUser,
        login,
        googleLogin,
        logOut,
        updateUser
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
