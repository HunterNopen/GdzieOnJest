import React, { useState } from 'react';
import { Text, TextInput, Button, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth, updatePassword } from '../services/AuthService';

const ChangePasswordPage = ({ route }) => {
    const { email } = route.params;
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState(null);
    const navigation = useNavigation();
    const { updatePassword } = useAuth();

    const handleChangePassword = async () => {
        if (password && repeatPassword) {
            if (password === repeatPassword) {
                try {
                    await updatePassword(email, password);
                    navigation.navigate('SignInPage');
                } catch (err) {
                    setError(err instanceof Error ? err.message : 'An unexpected error occurred');
                }
            } else {
                setError('Passwords do not match');
            }
        } else {
            setError('Please fill out all fields');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.rectangle}>
                <Text style={styles.title}>Change Password</Text>

                {error && <Text style={styles.errorText}>{error}</Text>}

                <TextInput
                    style={styles.input}
                    placeholder="New Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    accessibilityLabel="Enter new password"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Repeat Password"
                    value={repeatPassword}
                    onChangeText={setRepeatPassword}
                    secureTextEntry
                    accessibilityLabel="Repeat new password"
                />

                <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                    <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>

                <Text style={styles.linkText}>
                    <Text
                        onPress={() => navigation.navigate('SignInPage')}
                        style={{ color: 'blue' }}>
                        Back to Sign In
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

export default ChangePasswordPage;
