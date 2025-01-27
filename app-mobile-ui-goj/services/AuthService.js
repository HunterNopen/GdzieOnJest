import React, { createContext, useContext, useState } from 'react';

// Tworzenie kontekstu AuthService
const AuthService = createContext(undefined);

// Hook do korzystania z kontekstu AuthService
export const useAuth = () => {
    const context = useContext(AuthService);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Dostawca kontekstu AuthService
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    // Funkcja logowania
    const authSignIn = (userToken) => {
        setToken(userToken);
        // Logika ustawiania użytkownika, jeśli to konieczne
    };

    // Funkcja wylogowania
    const signOut = () => {
        setToken(null);
        setUser(null);
    };

    // Funkcja do wysyłania kodu odzyskiwania
    const sendRecoveryCode = async (email) => {
        console.log(`Sending recovery code to ${email}`);
        // Dodaj logikę wysyłania kodu odzyskiwania, np. wywołanie API
    };

    return (
        <AuthService.Provider value={{ token, user, authSignIn, signOut, sendRecoveryCode }}>
            {children}
        </AuthService.Provider>
    );
};

// Funkcja logowania
export const signIn = async (email, password) => {
    const hardcodedUser = { email: 'janKowalski@gmail.com', password: 'zaq1@WSX' };

    if (email === hardcodedUser.email && password === hardcodedUser.password) {
        const token = `mock-token-${Date.now()}`;
        return token;
    } else {
        throw new Error('Invalid email or password');
    }
};

// Funkcja rejestracji (niezaimplementowana)
export const signUp = async () => {
    throw new Error('Sign up functionality is not implemented in this version.');
};

// Funkcja pobierania danych użytkownika (niezaimplementowana)
export const getAuthUser = async () => {
    throw new Error('Get auth user functionality is not implemented in this version.');
};
