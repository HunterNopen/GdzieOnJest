import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextProps, User } from "../types/Types";

const AuthService = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthService);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
            fetchUserData(storedToken);
        }
    }, []);

    const fetchUserData = async (storedToken: string) => {
        try {
            const storedUser = localStorage.getItem('authUser');
            if (storedUser) {
                const userData: User = JSON.parse(storedUser); // Parse stored user data
                setUser(userData);
            } else {
                // const response = await fetch('https://api.example.com/user', {
                //     headers: {
                //         Authorization: `Bearer ${storedToken}`,
                //     },
                // });
                // if (!response.ok) throw new Error('Failed to fetch user data');
                // const userData = await response.json();
                // setUser(userData);
                console.error('No user data found in localStorage');
                setUser(null);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUser(null);
        }
    };

    const authSignIn = (userToken: string) => {
        setToken(userToken);
        localStorage.setItem('authToken', userToken);
        fetchUserData(userToken);
    };

    const signOut = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
    };

    return (
        <AuthService.Provider value={{ token, user, authSignIn, signOut }}>
            {children}
        </AuthService.Provider>
    );
};



export const signUp = async (user: User): Promise<User[]> => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some((u: User) => u.email === user.email);
    if (userExists) {
        throw new Error('User with this email already exists.');
    }
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return users;
};

export const signIn = async (email: string, password: string): Promise<string> => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => u.email === email && u.password === password);
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const token = `mock-token-${Date.now()}`;
    localStorage.setItem('authToken', token);
    localStorage.setItem('authUser', JSON.stringify(user));
    return token;
};

export const getAuthUser = async (): Promise<User | null> => {
    return JSON.parse(localStorage.getItem('authUser'));
}

