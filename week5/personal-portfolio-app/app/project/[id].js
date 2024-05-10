import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Link} from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker'
import { Button } from 'react-native';
import { useState } from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';

const projectID = () => {
  const { id } = useLocalSearchParams();

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
      <Text style={{fontSize: 25, fontWeight: 'bold'}}>Project ID: {id}</Text>


      {selectedImage && <ImageViewer style={{height: 400, width:400}} imageUrls={selectedImage} />}

      <Button title='Upload Image'
        theme="primary" label="Choose a photo" onPress={pickImageAsync}/>

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