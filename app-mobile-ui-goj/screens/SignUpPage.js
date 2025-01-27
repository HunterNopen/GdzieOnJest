import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import validator from 'validator';

// SignUpPage Component
const SignUpPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', repeatPassword: '', acceptTerms: false });
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    const handleInputChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateInputs = () => {
        const { name, email, password, repeatPassword, acceptTerms } = formData;

        if (!name || !email || !password || !repeatPassword) {
            setError('Wszystkie pola są wymagane');
            return false;
        }

        if (!validator.isEmail(email)) {
            setError('Podaj poprawny adres e-mail');
            return false;
        }

        if (password !== repeatPassword) {
            setError('Hasła się nie zgadzają');
            return false;
        }

        // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        // if (!passwordRegex.test(password)) {
        //     setError('Hasło musi mieć co najmniej 8 znaków i zawierać przynajmniej jedną literę oraz jedną cyfrę');
        //     return false;
        // }

        if (!acceptTerms) {
            setError('Musisz zaakceptować regulamin i politykę prywatności');
            return false;
        }

        const sanitizedName = validator.escape(name);
        setFormData(prev => ({ ...prev, name: sanitizedName }));

        setError(null);
        return true;
    };

    const handleSignUp = async () => {
        if (!validateInputs()) return;

        // Symulacja dodania konta
        try {
            // Symulacja udanej rejestracji
            Alert.alert('Sukces', 'Konto zostało pomyślnie utworzone!');
            
            // Przekierowanie na stronę logowania
            navigation.navigate('SignInPage');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Wystąpił nieoczekiwany błąd');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.rectangle}>
                <Text style={styles.title}>Rejestracja</Text>
                {error && <Text style={styles.errorText}>{error}</Text>}

                <TextInput
                    style={styles.input}
                    placeholder="Imię"
                    value={formData.name}
                    onChangeText={(value) => handleInputChange('name', value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nazwisko"
                    value={formData.surName}
                    onChangeText={(value) => handleInputChange('surName', value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Hasło"
                    value={formData.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Powtórz hasło"
                    value={formData.repeatPassword}
                    onChangeText={(value) => handleInputChange('repeatPassword', value)}
                    secureTextEntry
                />
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                        style={formData.acceptTerms ? styles.checkboxChecked : styles.checkboxUnchecked}
                        onPress={() => handleInputChange('acceptTerms', !formData.acceptTerms)}
                    >
                        {formData.acceptTerms && <View style={styles.innerCheckbox} />}
                    </TouchableOpacity>
                    <Text style={styles.checkboxText}>Akceptuję regulamin i politykę prywatności</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Zarejestruj się</Text>
                </TouchableOpacity>

                <Text style={styles.linkText}>
                    Masz już konto?{' '}
                    <Text style={{ color: 'blue' }} onPress={() => navigation.navigate('SignInPage')}>
                        Zaloguj się
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    checkboxChecked: {
        width: 20,
        height: 20,
        backgroundColor: '#007bff',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    checkboxUnchecked: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 4,
        marginRight: 8,
    },
    innerCheckbox: {
        width: 12,
        height: 12,
        backgroundColor: '#fff',
    },
    checkboxText: {
        color: '#000',
    },
});

export default SignUpPage;
