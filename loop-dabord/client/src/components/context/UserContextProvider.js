import React, { createContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    // State to manage guest users
    const [isGuest, setIsGuest] = useState(false);
    // State to store the current user's data
    const [currentUser, setCurrentUser] = useState(null);
    // State to manage the login process
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    // State to track if it's the first render
    const [isFirstRender, setIsFirstRender] = useState(true);
    // Destructuring necessary functions and states from useAuth0
    const { user, isAuthenticated, isLoading, logout, loginWithRedirect } = useAuth0();

    // Effect to handle user authentication and data fetching
    useEffect(() => {
        if (isAuthenticated) {
            setIsLoggingIn(true);

            // Fetching user data from the backend API
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

                    // Handling different response statuses
                    if (data.status === 200 || data.status === 201) {
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

    // Providing context values
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
