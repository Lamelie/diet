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

  const unsubscribe = NetInfo.addEventListener(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
  });
  
  // Unsubscribe
  unsubscribe();

  NetInfo.fetch().then(state => {
    console.log("Connection type", state.type);
    !state.isConnected ?
    alert("Vérifiez votre connexion !", state.isConnected) : null;
  });

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
          style={styles.formInput}
          value={textInputValue} 
          onChangeText={(text) => setTextInputValue(text)}
          placeholder="Ecrivez votre recherche ici"/>
        <Icon style={styles.addFood} onPress={getFood} name="search"/>
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
            <Icon style={styles.addFood} name="plus"/>
          </TouchableOpacity>}
        keyExtractor={item => JSON.stringify(item.food_name)}
      /> 
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
    textAlign: "center",
    color: "#578796",
    fontSize : 15,
    maxWidth: 230,
  },
  formContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 70,
  },
  formInput: {
    fontSize: 20,
    backgroundColor: "#d7e6eb",
    width: 320,
    padding: 10,
  },
  ingredientList: {
    padding: 10,
    backgroundColor: "#d7e6eb",
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