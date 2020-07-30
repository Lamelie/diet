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
  console.log('title :', params.title)
  //console.log('meal :', params.meal)

  const restoreDataFromAsyncStorage = async () => {
    try {
      const localStorageFood = await AsyncStorage.getItem('food');
      console.log("localStorageFood :", localStorageFood);
      return localStorageFood != null ? setFood(JSON.parse(localStorageFood)) : null;
    }catch (error) {
    }
  }

  useEffect(()=>{
    restoreDataFromAsyncStorage()
  }, []);

  useEffect(() => {
    if(params.params) {
      let newFoodState = params.params
      newFoodState = [...food, {id: food.length, meal:params.params.meal, name: params.params.name}]
      setFood(newFoodState) 
      AsyncStorage.setItem('food', JSON.stringify(newFoodState))
    }}, [params.params],

      );

  const filteredFood = (food, repas) => {
    return food.filter(el => repas == el.meal)
  }

  const remove = (item) => {
    console.log('item', item)
    let newFoodState = [...food];
    newFoodState = food.filter(({id}) => id !== item.id)
    setFood(newFoodState)

    AsyncStorage.setItem('food', JSON.stringify(newFoodState));

  }

  const mealFood = ({item}) => (
        <View style={styles.foodItem}>           
            <Text >{item.name}
            </Text>           
          <TouchableOpacity onPress={() => remove(item)}>
            <Text 
            style={styles.removeButton}>X</Text>
          </TouchableOpacity> 
        </View>)

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
      data={filteredFood(food, params.title)}
      renderItem={mealFood}
      keyExtractor={item => 'key' + item.name}
      />  
      <View>{(food.length === 0 ) ?<Text>Il n'y a pas d'aliment pour ce repas</Text>:null}</View>  
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
