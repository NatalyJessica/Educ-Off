import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './scr/Routes/index'


export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#a0a0a0" barStyle="light-content" />
      <Routes/>
    </NavigationContainer>
  );
}
