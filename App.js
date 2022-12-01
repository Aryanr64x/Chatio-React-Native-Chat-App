import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreens';
import AuthContextWrapper from './contexts/AuthContextWrapper';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
const Stack = createNativeStackNavigator()


export default function App() {
  return (
    <AuthContextWrapper>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name="welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="auth" component={AuthScreen} options={{ headerShown: false }} />
          <Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="chat" component={ChatScreen} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
