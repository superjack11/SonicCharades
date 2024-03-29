import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TitlePage from './Screens/TitlePage';
import SettingsPage from './Screens/SettingsPage';
import GamePage from './Screens/GamePage';



const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TitlePage" screenOptions={{ headerShown: false, gestureEnabled: false }} detachInactiveScreens>
        <Stack.Screen name="TitlePage" component={TitlePage} />
        <Stack.Screen name="SettingsPage" component={SettingsPage} />
        <Stack.Screen name="GamePage" component={GamePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
