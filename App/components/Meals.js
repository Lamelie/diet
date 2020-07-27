import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text, 
  View,
} from 'react-native';


export default TaskItem = (props) => {
  return (
    <View style={styles.taskItem}>
      <Text style={styles.taskDescription}>{props.content}</Text>
      <TouchableOpacity onPress={() => props.removeAction(props, 'delete')}>
        <Text 
        style={styles.removeButton} >X</Text>
      </TouchableOpacity> 
    </View>
  )
}
  
const styles = StyleSheet.create({
  taskItem: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between"

  },
  taskDescription: {
    fontSize : 20,

  },
  removeButton: {
    color: "red",
    fontWeight: "bold",
    fontSize : 25,
  }
});
