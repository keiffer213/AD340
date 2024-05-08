import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

interface Breed {
  id: number;
  type: string;
  attributes: {
    name: string,
    description: string,
    life: {
      max: number,
      min: number,
    },
    male_weight: {
      max: number,
      min: number,
    },
    female_weight: {
      max: number,
      min: number,
    },
    hypoallergenic: boolean,
  };
  relationships: {
    group: {
      data: {
        id: string,
        type: string,
      },
    },
  };
}

const queryClient = new QueryClient();

const fetchBreeds = async() => {
  const res = await fetch("https://dogapi.dog/api/v2/breeds");
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeScreen />
    </QueryClientProvider>
  );
}

function HomeScreen() {

  const { data, error, isLoading, isError, isPending, isSuccess } = useQuery({
    queryKey: ["todo"], 
    queryFn: fetchBreeds
  });

  if (isError) return <Text>Error occurred: {error.message}</Text>;
  if (isPending) return <Text>Pending...</Text>;
  if (isLoading) return <Text>Loading...</Text>;
  if (isSuccess) return (
    <ScrollView style={styles.Container}>
      <View style={{paddingHorizontal: 100, paddingVertical: 80, backgroundColor: '#abc'}}>
        <Text style={{fontSize: 40, fontWeight:'bold', marginVertical: 20}}>Dog API!</Text>

        {data && data.data.map((breed: Breed, index: number) => (
          <View key={breed.id} style={{ marginVertical: 10 }}>
            <Text style={[styles.listItems, {fontSize: 20, fontWeight: 'bold'}]}>Breed Name: {breed.attributes.name} </Text>
            <Text style={styles.listItems}>ID: {breed.id} </Text>
            <Text style={styles.listItems}>Male Weight (Min/Max): {breed.attributes.male_weight.min}/{breed.attributes.male_weight.max} </Text>
            <Text style={styles.listItems}>Female Weight (Min/Max): {breed.attributes.female_weight.min}/{breed.attributes.female_weight.max} </Text>
            <Text style={styles.listItems}>Hypoallergenic: {breed.attributes.hypoallergenic ? "Yes": "No"} </Text>
            <Text style={styles.listItems}>Description: {breed.attributes.description} </Text>
          </View>
          
        ))}
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
  listItems: {
    gap: 8,
    // marginVertical: 8,
    textAlign: 'left'
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
