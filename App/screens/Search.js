import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity, 
  View
} from 'react-native';

export default Search = () => {
  return (
    <View style={styles.container}>
      <Text>Bonjour, Search ! </Text>
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