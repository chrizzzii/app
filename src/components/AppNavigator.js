import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './login';
import Index from './index';
import Daftar from './daftar';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Daftar" component={Daftar} options={{ headerShown: false }} />
        <Stack.Screen name="Login" headerShown="false" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Index" component={Index} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
