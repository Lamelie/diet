import React, * as react from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity, 
  TextInput,
  View,
} from 'react-native';

import NetInfo from "@react-native-community/netinfo";
import Icon from 'react-native-vector-icons/FontAwesome5';

export default Search = ({navigation, route}) => {

  const [textInputValue, setTextInputValue] = React.useState('');

  const[food, setFood] = react.useState([]);

  console.log('meal :', route.params.meal)

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
    {setFood(responseResults.branded);}
    console.log(textInputValue)
  }
  
  react.useEffect(() => {
    getFood()
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput 
          value={textInputValue} 
          onChangeText={(text) => setTextInputValue(text)}
          placeholder="Recherche"/>
        <Icon.Button onPress={getFood} name="search"/>
      </View>
      <FlatList 
        data = {food}
        renderItem=  {
          ({item}) => 
          <TouchableOpacity 
          style={styles.ingredientList}
          onPress={() => navigation.navigate('Today', {
            name: item.food_name, 
            meal: route.params.meal})}>
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
  formContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"

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