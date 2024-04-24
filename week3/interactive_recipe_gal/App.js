import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Gallery from './Gallery';
import { recipe } from './imageList';
import CustomButton from './CustomButton';
import React, { useState } from 'react';


export default function App() {
  const [indexNo, setIndex] = useState(0);
  const previousItem = () => {
    if (indexNo > 0) {
      setIndex(n => n - 1);
    }

    // alert('Button Pressed!');
  };
  const nextItem = () => {
    if (indexNo < Object.keys(recipe).length-1)
    setIndex(n => n + 1);
    // setIndex(indexNo + 1);
    // alert('Button Pressed!');
  };
  
  return (
    <View style={styles.container}>
      <Gallery index={indexNo}/>

      <View style={styles.buttonContainer}>
        <CustomButton style={styles.button} onPress={previousItem} title="Back" color="red" />
        <CustomButton style={styles.button} onPress={nextItem} title="Next" color="green"/>
      </View>
      <Text>Index: {indexNo}</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  }

});
