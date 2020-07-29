import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text, 
  View,
  FlatList,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'

import { useNavigation } from '@react-navigation/native';

export default Meal = (params) => {

  const navigation = useNavigation();

  const [food, setFood] = useState([]);
  console.log("food:", food)
  console.log("params: ", params.params)

  /**const restoreDataFromAsyncStorage = async () => {
    try {
      const localStorageFood = await AsyncStorage.getItem('food');
      console.log("localStorageFood :", localStorageFood);
      return localStorageFood != null ? setFood(JSON.parse(localStorageFood)) : null;
    }catch (error) {
    }
  }

  useEffect(()=>{
    restoreDataFromAsyncStorage()
  }, []);**/


  useEffect(() => {
    if(params.params) {
      let newFoodState = params.params
      newFoodState = [...food, {id: food.length, name: params.params.name}]
      setFood(newFoodState)}}, [params.params]);


      //Persist les tasks dans le local storage.
      //await AsyncStorage.setItem('food', JSON.stringify(newFoodState));

  return (
    <View>
      <View style={styles.foodItem}>
        <Text style={styles.mealTitle}>{params.title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Text 
          style={styles.addButton} 
          >+</Text>         
        </TouchableOpacity> 
      </View>
      <FlatList
        data={food}
        renderItem={({item}) => (
          <View style={styles.foodItem}>
            <Text style={styles.taskDescription}>{item.name}</Text>
            <TouchableOpacity>
              <Text 
              style={styles.removeButton}>X</Text>
            </TouchableOpacity> 
          </View>
        )}
        keyExtractor={item => 'key' + item.name}
      />
    </View>
  )
}
  
const styles = StyleSheet.create({
  foodItem: {
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
    color: "white",
    fontWeight: "bold",
    fontSize : 25,
    backgroundColor: "blue",
    width: 35,
    borderRadius: 50,
    textAlign : "center",
  },
  removeButton: {
    color: "red",
    fontWeight: "bold",
    fontSize : 25,
    width: 35,
    borderRadius: 50,
    textAlign : "center",
  }
});
