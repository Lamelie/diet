import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity, 
  View
} from 'react-native';

import Meal from '../components/Meal';

export default Today = ({route}) => {
  return (
    <SafeAreaView style={styles.container}>     
      <Meal title="Petit déjeuner" params={route.params}/>   
      <Meal title="Déjeuner"/>
      <Meal title="Diner"/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  foodImage: {
    width: 150,
    height: 150,
  },
  loader: {
    flex: 1,
    flexDirection: "row",
    padding: 10
  }
})