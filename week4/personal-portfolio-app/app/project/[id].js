import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Link} from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

const projectID = () => {
    const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 25, fontWeight: 'bold'}}>Project ID: {id}</Text>


      <View style={{flexDirection: 'row'}}>
        <Link href={"/"} style={styles.linkButton}>Home Page</Link>
        <Link href={"/projects"} style={styles.linkButton}>Projects Page</Link>
      </View>



      <StatusBar style="auto" />
    </View>
  );
}

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
});

export default projectID;