import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { Link } from 'expo-router';
import * as ImagePicker from 'expo-image-picker'
import { Button } from 'react-native';
import { useState } from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';

export default function index() {
  const [selectedImage, setSelectedImage] = useState();

  const pickImageAsync = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage([{ url: result.assets[0].uri}]);
    } else {
      alert("You did not select any image.");
    };
  }

  return (
    <View style={styles.container}>
        <Text style={styles.headerText}>Keiffer's Purrrtfolio</Text>

        <Image style={{marginTop: 20, marginBottom: 20}} source={require('../assets/tomo.jpg')}/>
        {selectedImage && <ImageViewer style={{height: 400, width:400}} imageUrls={selectedImage} />}

        <Button title='Upload Image'
          theme="primary" label="Choose a photo" onPress={pickImageAsync}/>
        
        <Link href={"/projects"} style={styles.linkButton}>Projects Page</Link>
        <Link href={"/skills"} style={styles.linkButton}>Skills Page</Link>
        <Link href={"/contact"} style={styles.linkButton}>Contact Page</Link>


        <StatusBar style="auto" />
    </View>
    
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#def',
      alignItems: 'center',
      justifyContent: 'center',
    },
    linkButton: {
      padding: 5,
      margin: 5,
      borderColor: 'black',
      borderWidth: 1,
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold'
    }
  });

