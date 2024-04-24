import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TaskManager from './TaskManager';
import CustomButton from './CustomButton';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>TaskManager with React State using React Expo</Text> */}
      <TaskManager />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
