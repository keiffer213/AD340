import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { Link } from 'expo-router';

const contact = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.headerText}>Keiffer's Contact</Text>

        <View style={{flexDirection: 'row'}}>
            <Image style={{height:20, width: 20, marginRight: 10}}
            source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Github-desktop-logo-symbol.svg/2048px-Github-desktop-logo-symbol.svg.png'}} />
            <Text style={{marginTop: 15}}>Github: keiffer213</Text>
        </View>
        
        <View style={{flexDirection: 'row'}}>
            <Image style={{height:20, width: 20, marginRight: 10}}
            source={{uri: 'https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjk4Mi1kMy0xMC5wbmc.png'}} />
            <Text>LinkedIn: Keiffer Tan</Text>
        </View>
        
        <Text>Email: keiffer@mail.com</Text>
        <Text>Phone Number: (xxx)xxx-xxxx</Text>

        <Link href={"/"} style={styles.linkButton}>Go Back Home</Link>

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
      marginTop: 15,
      borderColor: 'black',
      borderWidth: 1,
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
    }
  });

export default contact