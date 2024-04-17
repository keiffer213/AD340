import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TextInput } from 'react-native';
import React from 'react';

export default function App() {
  const [text, onChangeText] = React.useState('Useless Text');
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Building a Profile with React Native Core Components</Text>
      <Image source={require('./assets/personal.jpg')} style={{width: 300, height: 300}} />
      
      <ScrollView style={styles.scrollview}>
        <Text style={styles.text}>Name: Keiffer{"\n"}</Text>
        <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porttitor maximus lorem vel venenatis. Cras et mattis sapien. Ut lectus erat, iaculis nec arcu quis, fringilla egestas nibh. Vivamus ullamcorper ante purus, vitae faucibus erat scelerisque et. Cras vel sapien feugiat, posuere metus et, vestibulum nisi. Quisque placerat, urna eget euismod pellentesque, libero risus suscipit risus, sodales feugiat purus lacus sed metus. Sed posuere pharetra diam, at ornare nibh laoreet at.Aenean dictum malesuada lorem, sit amet consequat leo vulputate quis. Fusce gravida mollis neque quis sollicitudin. Pellentesque a gravida augue, sed faucibus nulla. Quisque tincidunt lacus euismod, bibendum nibh sed, ornare lacus. Maecenas vitae fringilla elit, in molestie ex. Aenean vestibulum fermentum justo eu sagittis. Ut euismod gravida ligula eu suscipit. Vestibulum vitae bibendum arcu, et elementum massa. Aliquam lacinia elit a feugiat iaculis. Suspendisse id orci congue, porttitor libero eu, pharetra tellus. Nam dictum ullamcorper lorem vulputate finibus. Etiam id massa pulvinar, fringilla lectus eu, convallis quam. Sed id suscipit ipsum, at pharetra risus.</Text>
        <Text style={styles.text}>Nullam sagittis ante sed justo tincidunt finibus. Vivamus facilisis, mi in fermentum condimentum, nisl mi vehicula mauris, vitae tempus lectus erat ut dolor. Morbi facilisis orci libero. Praesent porta, libero aliquam pulvinar maximus, velit justo dictum tortor, aliquet tristique nunc arcu id odio. Proin non aliquet libero. Phasellus dictum varius lorem non consequat. Quisque suscipit orci ullamcorper pulvinar tincidunt. Fusce arcu magna, rhoncus vel venenatis sit amet, maximus a metus. Vivamus et sodales sem, blandit faucibus elit. Curabitur maximus volutpat efficitur. Aenean ut laoreet tellus, ac varius urna. Aenean feugiat dui at nibh ornare suscipit. Donec finibus blandit volutpat. Integer eu auctor tortor, et iaculis velit. Etiam rutrum eros ut mi ultricies, nec condimentum tortor luctus.</Text>
        <Text style={styles.text}>Suspendisse tristique venenatis nibh sit amet dictum. Pellentesque odio nisi, dictum eu maximus eu, faucibus ac turpis. Sed pharetra, nulla nec tincidunt faucibus, lacus ipsum scelerisque dui, at accumsan lorem lorem sed sem. Morbi eu leo sed erat feugiat malesuada vehicula eu nisl. Fusce nisi magna, imperdiet ut facilisis eu, consequat in urna. Maecenas sit amet erat aliquam, commodo justo quis, dictum augue. Nulla fringilla laoreet fringilla.</Text>
        <Text style={styles.text}>Sed a mi sit amet ipsum eleifend venenatis semper id lectus. Ut faucibus commodo sapien et vestibulum. Donec ut orci porta arcu fermentum tempus in sit amet velit. Nullam id cursus risus. Ut pretium erat eu nunc egestas faucibus. Ut imperdiet magna magna, nec dapibus augue maximus id. Praesent mi enim, posuere ac odio at, vestibulum bibendum enim. Mauris lacinia faucibus mauris, in blandit magna euismod id. Cras eget erat ultricies, laoreet lorem malesuada, venenatis nulla. Nunc dapibus pulvinar sem, et fermentum enim lobortis nec. Suspendisse ut lacus gravida, condimentum est in, tempus nulla. Proin placerat consequat lacinia. Morbi hendrerit metus at risus bibendum venenatis. Nunc sit amet lectus sed sem eleifend dictum vitae nec nisi.</Text>
      </ScrollView>

      <View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Place name here</Text>
          <TextInput style={styles.input} onChangeText={onChangeText} value={text} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Place age here</Text>
          <TextInput style={styles.input} value={text} />
        </View>
        <Text style={styles.button}>Submit</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#abb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    margin: 30,
  },
  scrollview: {
    margin: 30,
    backgroundColor: '#bce',
    width: 400,
    height: 30,
  },
  text: {
    fontSize: 20,
    margin: 15,
  },  
  input: {
    height: 40,
    margin: 2,
    borderWidth: 1,
    padding: 10,
    display: 'flex',
  },
  inputText: {
    display: 'flex',
  },
  inputContainer: {
    flexDirection: 'row', // Aligns children horizontally
    alignItems: 'center', // Centers children vertically in the container
  },
  button: {
    height: 30,
    width: 60,
    margin: 5,
    marginLeft:30,
    borderWidth: 1,
    backgroundColor: '#aad',
    padding: 5,
  },
});
