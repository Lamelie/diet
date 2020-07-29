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

export default Meal = (params, route) => {

  const navigation = useNavigation();

  const [food, setFood] = useState([]);
  console.log("food:", food)
  console.log("params: ", params.params)
  console.log('title :', params.title)
  //console.log('meal :', params.meal)

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
      // switch (meal) {
      //   case 'petit déjeuner':
          
      // }
      let newFoodState = params.params
      newFoodState = [...food, {id: food.length, meal:params.params.meal, name: params.params.name}]
      setFood(newFoodState)}}, [params.params]);


      //Persist les tasks dans le local storage.
      //await AsyncStorage.setItem('food', JSON.stringify(newFoodState));

  
  const mealFood = ({item}) => (
    (params.title == params.params.meal) ? 
        <View style={styles.foodItem}>           
            <Text >{item.name}
            </Text>           
          <TouchableOpacity>
            <Text 
            style={styles.removeButton}>X</Text>
          </TouchableOpacity> 
        </View> : <Text>Nada</Text>)
  

  return (
    <View>
      <View style={styles.foodItem}>
        <Text style={styles.mealTitle}>{params.title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Search',  {meal: params.title})}>
          <Text 
          style={styles.addButton} 
          >+</Text>         
        </TouchableOpacity> 
      </View>
      <FlatList
      data={food}
      renderItem={mealFood}
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
