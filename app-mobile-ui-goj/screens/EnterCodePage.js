import React, { useState } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../services/AuthService';

const EnterCodePage = ({ route }) => {
    const { email } = route.params;
    const [code, setCode] = useState('');
    const [error, setError] = useState(null);
    const navigation = useNavigation();
    const { verifyCode } = useAuth();

    const handleVerifyCode = async () => {
        if (code.trim()) {
            try {
                await verifyCode(email, code.trim());
                navigation.navigate('ChangePasswordPage', { email });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unexpected error occurred');
            }
        } else {
            setError('Please enter the code sent to your email');
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <View style={styles.rectangle}>
                    <Text style={styles.title}>Enter Code</Text>

                    {error && <Text style={styles.errorText}>{error}</Text>}

                    <TextInput
                        style={styles.input}
                        placeholder="Enter Code"
                        value={code}
                        onChangeText={setCode}
                        keyboardType="numeric"
                        returnKeyType="done"
                        onSubmitEditing={handleVerifyCode}
                        accessibilityLabel="Enter the verification code"
                    />

                    <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
                        <Text style={styles.buttonText}>Verify Code</Text>
                    </TouchableOpacity>

                    <Text style={styles.linkText}>
                        <Text
                            onPress={() => navigation.goBack()}
                            style={styles.backLink}>
                            Go Back
                        </Text>
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
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
    },
    backLink: {
        color: 'blue',
        textDecorationLine: 'underline',
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

export default EnterCodePage;
