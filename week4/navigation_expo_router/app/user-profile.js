import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Link} from 'expo-router';

const UserProfilePage = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 25, fontWeight: 'bold'}}>User Profile Page!</Text>

      <Link href={"/"} style={styles.linkButton}>Home Page</Link>
      <Link href={"/about"} style={styles.linkButton}>About Page</Link>
      <Link href={{pathname: "/user/456"}} style={styles.linkButton} >View User 456</Link>
      <Link href={{pathname: "/user/88"}} style={styles.linkButton} >View User 88</Link>



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

export default UserProfilePage;