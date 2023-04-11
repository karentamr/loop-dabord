import React, { createContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [isGuest, setIsGuest] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const { user, isAuthenticated, isLoading, logout, loginWithRedirect } = useAuth0();

    useEffect(() => {
        if (isAuthenticated) {
            setIsLoggingIn(true);

            fetch('/api/userAuth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setIsLoggingIn(false);

                    if (data.status === 200) {
                        console.log('data', data);
                        setCurrentUser(data.user);
                        setIsGuest(false);
                    } else if (data.status === 201) {
                        console.log('data', data);
                        setCurrentUser(data.user);
                        setIsGuest(false);
                    } else if (data.status === 500) {
                        alert('There was a problem logging you in. Please try again later.');
                    }
                })
                .catch((error) => {
                    setIsLoggingIn(false);
                    console.error('Error fetching user data:', error);
                });
        }
    }, [user, isAuthenticated, isLoading]);

    return (
        <UserContext.Provider
            value={{
                isGuest,
                setIsGuest,
                currentUser,
                setCurrentUser,
                isFirstRender,
                setIsFirstRender,
                user,
                isAuthenticated,
                isLoading: isLoading || isLoggingIn,
                logout,
                loginWithRedirect,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
