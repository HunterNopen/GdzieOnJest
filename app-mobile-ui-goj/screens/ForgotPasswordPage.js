import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../services/AuthService';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const navigation = useNavigation();
    const { sendRecoveryCode } = useAuth(); // Pobierz funkcję sendRecoveryCode z useAuth

    const handleSendCode = async () => {
        if (email) {
            try {
                await sendRecoveryCode(email);
                navigation.navigate('EnterCodePage', { email }); // Przejdź do strony Enter Code
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unexpected error occurred');
            }
        } else {
            setError('Please enter your email');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.rectangle}>
                <Text style={styles.title}>Forgot Password</Text>

                {error && <Text style={styles.errorText}>{error}</Text>}

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    accessibilityLabel="Enter your email address"
                />

                <TouchableOpacity style={styles.button} onPress={handleSendCode}>
                    <Text style={styles.buttonText}>Send Code</Text>
                </TouchableOpacity>

                <Text style={styles.linkText}>
                    <Text
                        onPress={() => navigation.goBack()}
                        style={{ color: 'blue' }}>
                        Go Back
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
        backgroundColor: '#d3d3d3',
        padding: 16,
    },
    rectangle: {
        width: '80%',
        padding: 20,
        backgroundColor: '#f7f3b6',
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
    button: {
        backgroundColor: '#f6d03d',
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

export default ForgotPasswordPage;
