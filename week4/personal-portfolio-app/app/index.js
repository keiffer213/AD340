import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { Link } from 'expo-router';


const index = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.headerText}>Keiffer's Purrtfolio</Text>

        <Image style={{marginTop: 20, marginBottom: 20}} source={require('../assets/tomo.jpg')}/>

        
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

export default index