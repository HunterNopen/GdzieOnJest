import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../services/AuthService.tsx';

const SignUpPage: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignUp = async () => {
        const { name, email, password } = formData;

        if (!name || !email || !password) {
            setError('Please fill out all fields');
            return;
        }

        try {
            await signUp({ name, email, password });
            navigate('/signin');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
            />
            <button onClick={handleSignUp}>Sign Up</button>

            <p>
                Already have an account? <Link to="/signin">Sign In</Link>
            </p>
        </div>
    );
};

export default SignUpPage;
