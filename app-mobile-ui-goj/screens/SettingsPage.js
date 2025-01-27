import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Button } from 'react-native';

const SettingsPage = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const toggleNotifications = () => setNotificationsEnabled(previousState => !previousState);
  const toggleDarkMode = () => setDarkModeEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ustawienia</Text>

      <View style={styles.option}>
        <Text style={styles.optionText}>Powiadomienia</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>

      <View style={styles.option}>
        <Text style={styles.optionText}>Tryb ciemny</Text>
        <Switch
          value={darkModeEnabled}
          onValueChange={toggleDarkMode}
        />
      </View>

      <Button
        title="Powrót do głównej strony"
        onPress={() => navigation.navigate('MainPage')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F1F1F1',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 18,
  },
});

export default SettingsPage;
