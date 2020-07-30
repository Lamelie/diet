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

//dans les props on récupère la navigation qui permet de repartir vers la page Today, ainsi que "route" qui permet de récupérer le nom du repas sur lequel on a cliqué. 
export default Search = ({navigation, route}) => {


  //cette fonction permet de s'abonner aux informations de connexion
  const unsubscribe = NetInfo.addEventListener(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
  });  
  unsubscribe();

  //cette fonction récupère les informations de connexion et les transmets sous forme d'alerte dans le cas où il n'y a pas de connexion.
  NetInfo.fetch().then(state => {
    !state.isConnected ?
    alert("Vérifiez votre connexion !", state.isConnected) : null;
  });

  //ce state permet de gérer les données inscrites dans le formulaire de recherche
  const [textInputValue, setTextInputValue] = React.useState('');

  //ce state permet d'enregistrer l'aliment sélectionné.
  const[food, setFood] = react.useState([]);

  //console.log('meal :', route.params.meal)

  //cette fonction permet de récuperer les aliments de l'API nutritionnix
  const getFood = async () => {
    const myHeaders = new Headers();
    myHeaders.append("x-app-id", "4119ca3f");
    myHeaders.append("x-app-key", "77f7c81e976c23373b7f1d85f7af9ecb");
    
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    //les données sont stockées dans response
    let response = await fetch("https://trackapi.nutritionix.com/v2/search/instant?query=" + textInputValue, requestOptions)
    
    //responseResults permet de transformer les données sous format json
    let responseResults = await response.json() 

    //ces deux fonctions permettent de concatener les deux sets de données branded et common afin d'avoir la totalité des aliments proposés par l'API
    let brandedResults = await responseResults.branded
    let commonResults = await responseResults.common
    setFood(commonResults.concat(brandedResults));
  }
  
  //le useEffect permet de lancer la fonction getFood au moment où l'on presse le bouton recherche.
  react.useEffect(() => {
    getFood
  }, []);

  console.log("food", food)

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput 
          style={styles.formInput}
          value={textInputValue} 
          onChangeText={(text) => setTextInputValue(text)}
          placeholder="Ecrivez votre recherche ici"/>
          {/* ci-dessous on active la fonction getfood au moment de l'appui sur la loupe. */}
        <Icon style={styles.addFood}  onPress={getFood} name="search"/>
      </View>
      <FlatList 
        data = {food}
        renderItem=  {
          ({item}) => 
          <TouchableOpacity 
          style={styles.ingredientList}
          onPress={() => navigation.navigate('Today', {
            // ici on renvoie le nom de l'aliment, l'url de la photo ansi que la donnée du repas précédemment sélectionné
            name: item.food_name, 
            image: item.photo.thumb,
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
    borderRadius: 50,
    color:"white",
    fontSize: 25,
    height: 50,
    textAlign: "center",
    textAlignVertical: "center",
    width: 50,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  foodImage: {
    borderRadius: 50,
    height: 50,
    width: 50,
  },
  foodName: {
    color: "#578796",
    fontSize : 15,
    maxWidth: 230,
    textAlign: "center",
    textAlignVertical: "center",
  },
  formContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 70,
  },
  formInput: {
    backgroundColor: "#d7e6eb",
    fontSize: 20,
    padding: 10,
    width: 320,
  },
  ingredientList: {
    backgroundColor: "#d7e6eb",
    borderColor: "white",
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  loader: {
    flex: 1,
    flexDirection: "row",
    padding: 10
  }
})