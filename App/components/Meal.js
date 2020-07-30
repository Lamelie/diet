import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text, 
  View,
  FlatList,
  Image,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'

import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome5';

export default Meal = (params) => {

  const navigation = useNavigation();

  const [food, setFood] = useState([]);
  console.log("food:", food)
  console.log("params: ", params.params)
  console.log('title :', params.title)
  console.log('image:', params.params.image)

  const restoreDataFromAsyncStorage = async () => {
    try {
      const localStorageFood = await AsyncStorage.getItem('food');
      console.log("localStorageFood :", localStorageFood);
      return localStorageFood != null ? setFood(JSON.parse(localStorageFood)) : null;
    }catch (error) {
      console.log("error : ", error)
    }
  }

  useEffect(()=>{
    restoreDataFromAsyncStorage()
  }, []);

  useEffect(() => {
    if(params.params) {
      let newFoodState = params.params
      newFoodState = [...food, {id: food.length, meal:params.params.meal, image: params.params.image, name: params.params.name}]
      setFood(newFoodState) 
      AsyncStorage.setItem('food', JSON.stringify(newFoodState))
    }}, [params.params],
  );

  const filteredFood = (food, meal) => {
    return food.filter(el => meal == el.meal)
  }

  const remove = (item) => {
    console.log('removeditem', item)
    let newFoodState = [...food];
    newFoodState = food.filter(({id}) => id !== item.id)
    setFood(newFoodState)
    AsyncStorage.setItem('food', JSON.stringify(newFoodState));
  }

  const mealFood = ({item}) => (
    <View style={styles.foodItem}>
        <Image
          style={styles.foodImage}
          source={{uri: item.image}}
        />           
        <Text style={styles.foodText} >{item.name}
        </Text>           
      <TouchableOpacity onPress={() => remove(item)}>
        <Icon style={styles.deleteFood} name="times"/>
      </TouchableOpacity> 
    </View>)

  return (
    <View>
      <View style={styles.mealItem}>
        <Text style={styles.mealTitle}>{params.title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Search',  {meal: params.title})}>
        <Icon style={styles.addFood} name="plus"/>        
        </TouchableOpacity> 
      </View>
      <FlatList
        data={filteredFood(food, params.title)}
        renderItem={mealFood}
        keyExtractor={item => 'key' + item.name + Math.random()}
      />  
      <View>{(food.length === 0 ) ?<Text style={styles.foodItem}>Il n'y a pas d'aliment pour ce repas</Text>:null}
      </View>  
    </View>
  )
}
  
const styles = StyleSheet.create({

  addFood: {
    backgroundColor: "#6eadc0",
    color:"white",
    fontSize: 25,
    width: 50,
    height: 50,
    borderRadius: 50,
    textAlign: "center",
    textAlignVertical: "center"
  },
  deleteFood: {
    color: "red",
    fontWeight: "bold",
    fontSize : 25,
    width: 50,
    borderRadius: 50,
    textAlign : "center",
  },
  flatList: {
    backgroundColor: "#d3e8ef",
    margin: 10,
  },
  foodItem: {
    flexDirection: "row",
    paddingLeft: 18,
    paddingRight: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  foodImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  foodText: {
    color: "#6eadc0",
    textAlign: "center",
    fontSize: 18,
    marginBottom: 3,
    maxWidth: 250,
    paddingVertical: 10,
  },
  mealItem: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  mealTitle: {
    color: "#578796",
    fontSize : 20,
    backgroundColor: "#c5dee5",
    width: 320,
    padding: 8,
  },

});
