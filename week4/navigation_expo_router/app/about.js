import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Link } from 'expo-router';

const AboutPage = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 25, fontWeight: 'bold'}}>About Page!</Text>

      <Text>Normal Link</Text>
      <View style={styles.rowView}>
        
        <Link href={"/"} style={styles.linkButton}>Home Page</Link>
        <Link href={"/user-profile"} style={styles.linkButton}>User Profile Page</Link>
      </View>


      <Text>Push Link</Text>
      <View style={styles.rowView}>
        <Link push href={"/"} style={styles.linkButton}>Home Page</Link>
        <Link push href={"/user-profile"} style={styles.linkButton}>User Profile Page</Link>
      </View>

      <Text>Replace Link</Text>
      <View style={styles.rowView}>
        <Link replace href={"/"} style={styles.linkButton}>Home Page</Link>
        <Link replace href={"/user-profile"} style={styles.linkButton}>User Profile Page</Link>
      </View>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkButton: {
    padding: 5,
    margin: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  rowView: {
    flexDirection: 'row'

  },
});

export default AboutPage;