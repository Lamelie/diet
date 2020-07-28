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
  View,
  Button
} from 'react-native';

export default Search = () => {

  const [textInputValue, setTextInputValue] = React.useState('');

  const[food, setFood] = useState([]);

  const getFood = async () => {
    const myHeaders = new Headers();
    myHeaders.append("x-app-id", "4119ca3f");
    myHeaders.append("x-app-key", "77f7c81e976c23373b7f1d85f7af9ecb");
    
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    
    let response = await fetch("https://trackapi.nutritionix.com/v2/search/instant?query=" + textInputValue, requestOptions)
    
    let responseResults = await response.json() ;
    {
      setFood(responseResults.branded);
    }
    console.log(textInputValue)
  }
  
  useEffect(() => {
    getFood()
  }, []);
  
  return (
    <View style={styles.container}>
      <TextInput 
        value={textInputValue} 
        onChangeText={(text) => setTextInputValue(text)}
        placeholder="Recherche"/>
      <Button title="+" onPress={getFood}></Button>
      <FlatList 
        data = {food}
        renderItem=  {
          ({item}) => 
          <TouchableOpacity style={styles.ingredientList}>
            <Image
            style={styles.foodImage}
            source={{uri: item.photo.thumb}}
            />
            <Text style={styles.foodName}>{item.food_name}</Text>
            <Text style={styles.addFood}>+</Text>
          </TouchableOpacity>}
        keyExtractor={item => JSON.stringify(item.food_name)}
      /> 
    </View>
  )
}


const styles = StyleSheet.create({
  addFood: {
    backgroundColor: "blue",
    color:"white",
    fontSize: 25,
    width: 50,
    borderRadius: 50,
    textAlign: "center",
    textAlignVertical: "center"

  },
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center"
  },
  foodImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  foodName: {
    textAlignVertical: "center",

  },
  BigFoodImage: {
    width: 250,
    height: 250,
  },
  ingredientList: {
    padding: 10,
    backgroundColor: "#d7dadd",
    borderWidth: 2,
    borderColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loader: {
    flex: 1,
    flexDirection: "row",
    padding: 10
  }
})