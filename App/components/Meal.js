import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text, 
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';


export default Meal = (props) => {

  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.taskItem}>
        <Text style={styles.mealTitle}>{props.title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Text 
          style={styles.addButton} 
          >+</Text>         
        </TouchableOpacity> 
      </View>
      <Text style={styles.mealText}>Vous n'avez pas encore ajouté d'aliment pour ce repas</Text>
    </View>
  )
}
  
const styles = StyleSheet.create({
  taskItem: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between"

  },
  mealTitle: {
    fontSize : 20,

  },
  mealText: {
    fontSize : 14,
    padding: 15,
  },
  addButton: {
    color: "blue",
    fontWeight: "bold",
    fontSize : 25,
  }
});
