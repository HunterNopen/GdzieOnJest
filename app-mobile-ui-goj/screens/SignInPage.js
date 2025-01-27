import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../services/AuthService';
import { signIn } from '../services/AuthService';

const SignInPage = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const navigation = useNavigation();
    const { authSignIn } = useAuth();

    const handleInputChange = (name, value) => {
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleSignIn = async () => {
        if (credentials.email && credentials.password) {
            try {
                const token = await signIn(credentials.email, credentials.password);
                authSignIn(token);
                navigation.replace('MainPage');
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unexpected error occurred');
            }
        } else {
            setError('Please fill out all fields');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.rectangle}>
                <Text style={styles.title}>Sign In</Text>

                {error && <Text style={styles.errorText}>{error}</Text>}

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={credentials.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={credentials.password}
                    onChangeText={(text) => handleInputChange('password', text)}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                <Text style={styles.linkText}>
                    Don't have an account?{' '}
                    <Text
                        onPress={() => navigation.navigate('SignUpPage')}
                        style={styles.linkHighlight}>
                        Sign Up
                    </Text>
                </Text>

                <Text style={styles.linkText}>
                    <Text
                        onPress={() => navigation.navigate('ForgotPasswordPage')}
                        style={styles.linkHighlight}>
                        Forgot Password?
                    </Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d3d3d3', // Light gray background
        padding: 16,
    },
    rectangle: {
        width: '80%',
        padding: 20,
        backgroundColor: '#f7f3b6', // Light yellow rectangle
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#888',
        padding: 12,
        marginBottom: 16,
        borderRadius: 6,
        backgroundColor: '#fff',
    },
    errorText: {
        color: 'red',
        marginBottom: 16,
        textAlign: 'center',
    },
    linkText: {
        marginTop: 16,
        textAlign: 'center',
        color: '#1e90ff',
    },
    linkHighlight: {
        color: '#007bff',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#f6d03d', // Yellow button
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default SignInPage;
