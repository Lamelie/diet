import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import Meal from '../components/Meal';
import { ScrollView } from 'react-native-gesture-handler';

export default Today = ({route}) => {
  return (
    <SafeAreaView style={styles.container}> 
      <ScrollView>  
         {/* on fait passer des props au composant Meal : le title et "params" qui contient toutes les données relatives aux aliments : id, name, photo et le "meal" concerné  */}
        <Meal title="Petit déjeuner" params={route.params}/>   
        <Meal title="Déjeuner" params={route.params}/>
        <Meal title="Diner" params={route.params}/>
      </ScrollView> 
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  foodImage: {
    width: 150,
    height: 150,
  },
  loader: {
    flex: 1,
    flexDirection: "row",
    padding: 10
  }
})