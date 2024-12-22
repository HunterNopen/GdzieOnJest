import React from 'react';
import {useAuth} from "../services/AuthService.tsx";

const PersonalPage: React.FC = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const { signOut } = useAuth();

    const handleSignOut = () => {
        signOut();
        window.location.reload();
    };

    return (
        <div>
            <h1>Personal Page</h1>
            <h2>Hi, {user.name}!</h2>
            <p>Email: {user.email}</p>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default PersonalPage;

