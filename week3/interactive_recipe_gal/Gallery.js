import React from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { recipe } from './imageList';


const Item = (title) => {
    <View>
        <Text>{title}</Text>
    </View>
};

const Gallery = ({index}) => {
const item = recipe[index];

  return (
    <View style={styles.container}> 
      <Text>Recipe Gallery!</Text>

      <>
        {item ? <Item title={item.title} /> : <Text>No item found.</Text>}
        <Text>ID: {item.id}</Text>
        <Text>Title: {item.title}</Text>
        <Text>Ingredients: {item.ingredients}</Text>
        <Image 
          source={{ uri: item.image }}
          style={styles.image} 
        />
        {/* <Text>{item.image}</Text> */}
      </>

      {/* the flatlist displayed all of the items in the recipe list */}
      {/* <FlatList 
        data={recipe}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Text>{item.id}</Text>}
      /> */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.25,
  },
  image: {
    width: 200,  
    height: 200, 
    resizeMode: 'cover'  
  },
});

export default Gallery;