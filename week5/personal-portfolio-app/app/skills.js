import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

const skills = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.headerText}>Keiffer's Skills</Text>

        <Text style={{fontWeight: 'bold', marginTop: 20}}>Frontend: </Text>
        <Text>HTML, CSS, JavaScript, React.js</Text>
        <Text style={{fontWeight: 'bold', marginTop: 20}}>Backend: </Text>
        <Text>Java, Node.js, Python, C++</Text>
        <Text style={{fontWeight: 'bold', marginTop: 20}}>Data Management/Visualization: </Text>
        <Text>MySQL, SQL, BigQuery, Tableau, PowerBI</Text>
        <Text style={{fontWeight: 'bold', marginTop: 20}}>Other: </Text>
        <Text>Version Control (Git, GitHub), Microsoft Excel, Agile, Scrum</Text>
    


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
      marginTop:20,
      borderColor: 'black',
      borderWidth: 1,
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold'
    }
  });

export default skills