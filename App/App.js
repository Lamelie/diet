import 'react-native-gesture-handler';
import React from 'react';

import Today from './screens/Today';
import Search from './screens/Search';

//import des composants pour générer une navigation entre écrans

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='Today' 
          component={Today} 
          options={() => ({ 
            title: 'AUJOURD\'HUI',
            headerstyle: {
              backgroundColor: '#d7e7f6',
            },
            headerTintColor: "#6eadc0",
            headerTitleStyle: {
              flex: 1,
              alignSelf:"center"
              }           
            })
          } 
        />
        <Stack.Screen 
          name="Search" 
          component={Search} 
          options={() => ({ 
            title: 'AJOUTER UN ALIMENT',
            headerstyle: {
              backgroundColor: '#d7e7f6',
            },
            headerTintColor: "#6eadc0",
            headerTitleStyle: {
              flex: 1,
              alignSelf:"center"
              }           
            })
          } 
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}