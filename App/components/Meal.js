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
  //console.log("food:", food)
  //console.log("params: ", params.params)
  //console.log('title :', params.title)
  //console.log('image:', params.params.image)

  //cette fonction permet de récupérer les données précédemment sauvegardées dans AsyncStorage et les remets dans le state "food"
  const restoreDataFromAsyncStorage = async () => {
    try {
      const localStorageFood = await AsyncStorage.getItem('food');
      //console.log("localStorageFood :", localStorageFood);
      return localStorageFood != null ? setFood(JSON.parse(localStorageFood)) : null;
    }catch (error) {
      console.log("error : ", error)
    }
  }

  //ce  useEffect permet de lancer la fonction de récupération des données 1 fois, au moment du render de la page.
  useEffect(()=>{
    restoreDataFromAsyncStorage()
  }, []);

  //ce useEffect permet de récuperer les données envoyées dans les props (id, name, image et meal) lorsqu'un nouvel aliment est ajouté et de les intégrer au state "food".
  useEffect(() => {
    // la condition permet de n'activer le useEffect uniquement s'il y a des données d'aliments dans les props.
    if(params.params) {
      let newFoodState = params.params
      newFoodState = [...food, {id: food.length, meal:params.params.meal, image: params.params.image, name: params.params.name}]
      setFood(newFoodState) 
      //après ajout dans le state, le nouvel aliment est enregistré dans l'AsyncStorage.
      AsyncStorage.setItem('food', JSON.stringify(newFoodState))
    }}, [params.params],
  );

  //cette fonction permet de filtrer chaque aliment du state en fonction du repas auquel il est associé.
  const filteredFood = (food, meal) => {
    return food.filter(el => meal == el.meal)
  }

  //cette fonction permet de supprimer un aliment du state, ainsique que du AsyncStorage.
  const remove = (item) => {
    //console.log('removeditem', item)
    let newFoodState = [...food];
    newFoodState = food.filter(({id}) => id !== item.id)
    setFood(newFoodState)
    AsyncStorage.setItem('food', JSON.stringify(newFoodState));
  }

  //mealFood est le "renderItem" de la flatlist affichée.
  const mealFood = ({item}) => (
    <View style={styles.foodItem}>
      <Image
        style={styles.foodImage}
        source={{uri: item.image}}
      />           
      <Text style={styles.foodText} >{item.name}
      </Text>
      {/* ci-dessous on active la fonction remove */}
      <TouchableOpacity onPress={() => remove(item)}>
        <Icon style={styles.deleteFood} name="times"/>
      </TouchableOpacity> 
    </View>)

  return (
    <View>
      <View style={styles.mealItem}>
        <Text style={styles.mealTitle}>{params.title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Search', {meal: params.title})}>
          <Icon 
            style={styles.addFood} 
            name="plus"/>        
        </TouchableOpacity> 
      </View>
      <FlatList
        data={filteredFood(food, params.title)}
        renderItem={mealFood}
        keyExtractor={item => 'key' + item.name + Math.random()}
      /> 
       {/* TODO: ici la condition ne permet pas de filtrer en fonction des repas  */}
      <View>{(food.length === 0 ) ?<Text style={styles.foodItem}>Il n'y a pas d'aliment pour ce repas</Text>:null}
      </View>  
    </View>
  )
}
  
const styles = StyleSheet.create({
//afin de rendre le style plus ordonné, tout a été trié par ordre alphabétique.

  addFood: {
    backgroundColor: "#6eadc0",
    borderRadius: 50,
    color:"white",
    fontSize: 25,
    height: 50,
    textAlign: "center",
    textAlignVertical: "center",
    width: 50
  },
  deleteFood: {
    borderRadius: 50,
    color: "red",
    fontWeight: "bold",
    fontSize : 25,
    textAlign : "center",
    width: 50,
  },
  flatList: {
    backgroundColor: "#d3e8ef",
    margin: 10,
  },
  foodItem: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 18,
    paddingRight: 10,
  },
  foodImage: {
    borderRadius: 50,
    height: 40,
    width: 40,
  },
  foodText: {
    color: "#6eadc0",
    fontSize: 18,
    marginBottom: 3,
    maxWidth: 250,
    paddingVertical: 10,
    textAlign: "center",
  },
  mealItem: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  mealTitle: {
    backgroundColor: "#c5dee5",
    color: "#578796",
    fontSize : 20,
    padding: 8,
    width: 320,
  },

});
