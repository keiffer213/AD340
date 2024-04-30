import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

const projectsPage = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.headerText}>Keiffer's Projects</Text>

        <Link href={"/"} style={styles.linkButton}>Go Back Home</Link>

        <Text>Push Links</Text>
        <View style={{flexDirection: 'row'}}>
            <Link push href={"/project/1"} style={styles.linkButton}>Project 1</Link>
            <Link push href={"/project/2"} style={styles.linkButton}>Project 2</Link>
            <Link push href={"/project/3"} style={styles.linkButton}>Project 3</Link>
        </View>

        <Text>Repalce Links</Text>
        <View style={{flexDirection: 'row'}}>
            <Link replace href={"/project/1"} style={styles.linkButton}>Project 1</Link>
            <Link replace href={"/project/2"} style={styles.linkButton}>Project 2</Link>
            <Link replace href={"/project/3"} style={styles.linkButton}>Project 3</Link>
        </View>

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

export default projectsPage