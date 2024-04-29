import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';


const HomePage = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 25, fontWeight: 'bold'}}>Home Page!</Text>

      <Link href={"/about"} style={styles.linkButton}>About Page</Link>
      <Link href={"/user-profile"} style={styles.linkButton}>User Profile Page</Link>

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
});

export default HomePage;
