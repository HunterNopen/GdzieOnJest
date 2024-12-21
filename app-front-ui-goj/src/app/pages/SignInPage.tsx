import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthService.tsx';
import { signIn } from '../services/AuthService.tsx';

const SignInPage: React.FC = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { authSignIn } = useAuth();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignIn = async () => {
        if (credentials.email && credentials.password) {
            try {
                const token = await signIn(credentials.email, credentials.password);
                authSignIn(token);
                navigate('/');
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unexpected error occurred');
            }
        } else {
            setError('Please fill out all fields');
        }
    };

    return (
        <div>
            <h1>Sign In</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={credentials.email}
                onChange={handleInputChange}
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleInputChange}
            />

            <button onClick={handleSignIn}>Sign In</button>

            <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
};

export default SignInPage;
