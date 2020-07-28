import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity, 
  TextInput,
  View
} from 'react-native';
import Food from "../../foods.json"

export default Search = () => {

  const[food, setFood] = useState([]);

  const getFood = async () => {
    const myHeaders = new Headers();
    myHeaders.append("x-app-id", "4119ca3f");
    myHeaders.append("x-app-key", "77f7c81e976c23373b7f1d85f7af9ecb");
    
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    
    let response = await fetch("https://trackapi.nutritionix.com/v2/search/instant?query=salad", requestOptions)
    
    let responseResults = await response.json() ;
    {
      setFood(responseResults.branded);
    }
  }
  
  useEffect(() => {
    getFood()
  }, []);
  
  return (
    <View style={styles.container}>
      <Text>Bonjour, Search ! </Text>
      <TextInput placeholder="Recherche"/>
      <FlatList 
        data = {food}
        renderItem=  {
          ({item}) => 
            <Text>{item.food_name}</Text>}
        keyExtractor={item => JSON.stringify(item.food_name)}  
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center"
  },
  foodImage: {
    width: 150,
    height: 150,
  },
  BigFoodImage: {
    width: 250,
    height: 250,
  },
  loader: {
    flex: 1,
    flexDirection: "row",
    padding: 10
  }
})