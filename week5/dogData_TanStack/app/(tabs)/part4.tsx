import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

export default function TabFourScreen() {
  return (
    <ScrollView style={styles.Container}>
      <View style={{paddingHorizontal: 100, paddingVertical: 80, backgroundColor: '#abc'}}>
        <Text style={{fontSize: 40, fontWeight:'bold', marginVertical: 20}}>Part 4</Text>


      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#ddd',
    // alignItems: 'center',
    // margin: 'auto',
    // justifyContent: 'center',
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
