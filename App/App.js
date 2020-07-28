import 'react-native-gesture-handler';
import React from 'react';

import Today from './screens/Today';
import Search from './screens/Search';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AUJOURD'HUI" component={Today} />
        <Stack.Screen name="Search" component={Search} options={() => ({ title: 'AJOUTER UN ALIMENT'})} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}