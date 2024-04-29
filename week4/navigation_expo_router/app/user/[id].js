import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Link} from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

const UserProfilePage = () => {
    const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 25, fontWeight: 'bold'}}>ID: {id} Page!</Text>

      <Link href={"/"} style={styles.linkButton}>Home Page</Link>

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

export default UserProfilePage;