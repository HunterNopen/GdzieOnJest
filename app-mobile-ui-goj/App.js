import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SelectDirection from "./screens/SelectDirection";
import MainPage from "./screens/MainPage";
import ProfilePage from "./screens/ProfilePage";
import SettingsPage from "./screens/SettingsPage";
import RoutesPage from "./screens/RoutesPage";
import MapPage from "./screens/MapPage";
import SignInPage from "./screens/SignInPage";
import SignUpPage from "./screens/SignUpPage"
import AddFavoriteRoute from './screens/AddFavoriteRoute';
import ForgotPasswordPage from "./screens/ForgotPasswordPage";
import EnterCodePage from "./screens/EnterCodePage"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// Import AuthProvider
import { AuthProvider } from './services/AuthService';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SignInPage"
            component={SignInPage}
            options={{
              headerShown: false,
            }}
          />
              <Stack.Screen
            name="SignUpPage"
            component={SignUpPage}
            options={{
              headerShown: false,
            }}
          />
                <Stack.Screen
            name="ForgotPasswordPage"
            component={ForgotPasswordPage}
            options={{
              headerShown: false,
            }}
          />
                    <Stack.Screen
            name="EnterCodePage"
            component={EnterCodePage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MainPage"
            component={MainPage}
            options={{
              headerShown: false,
            }}
          />
            <Stack.Screen
            name="AddFavoriteRoute"
            component={AddFavoriteRoute}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RoutesPage"
            component={RoutesPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SelectDirection"
            component={SelectDirection}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ProfilePage"
            component={ProfilePage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SettingsPage"
            component={SettingsPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MapPage"
            component={MapPage}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
