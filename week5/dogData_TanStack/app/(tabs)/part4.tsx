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
      <TabFourScreen />
    </QueryClientProvider>
  );
}

function TabFourScreen() {
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
  listItems: {
    gap: 8,
    // marginVertical: 8,
    textAlign: 'left'
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
