import { Image, StyleSheet, Platform, View, Text, TouchableOpacity } from 'react-native';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
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

const fetchBreedDetails = async (breedId: number) => {
  const res = await fetch(`https://dogapi.dog/api/v2/breeds/${breedId}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

const fetchDogFacts = async () => {
  const res = await fetch('https://dogapi.dog/api/v2/facts');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

const fetchDogGroups = async () => {
  const res = await fetch('https://dogapi.dog/api/v2/groups');
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
  const [selectedBreedId, setSelectedBreedId] = useState<number | null>(null);

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["breeds"], 
    queryFn: fetchBreeds
  });

  const { data: breedDetails, isLoading: isLoadingBreed, isError: isErrorBreed } = useQuery({
    queryKey: ["breedDetails", selectedBreedId],
    queryFn: () => fetchBreedDetails(selectedBreedId!),
    enabled: !!selectedBreedId 
  });

  const { data: dogFacts, isLoading: isLoadingFacts, isError: isErrorFacts } = useQuery({
    queryKey: ["dogFacts"],
    queryFn: fetchDogFacts
  });

  const { data: dogGroups, isLoading: isLoadingGroups, isError: isErrorGroups } = useQuery({
    queryKey: ["dogGroups"],
    queryFn: fetchDogGroups
  });

  if (isLoading || isLoadingBreed || isLoadingFacts || isLoadingGroups) return <Text>Loading...</Text>;
  if (isError || isErrorBreed || isErrorFacts || isErrorGroups) return <Text>Error occurred</Text>;
  
  return (
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

        {selectedBreedId && breedDetails && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Breed Details</Text>
            <Text style={styles.listItems}>Name: {breedDetails.data.attributes.name}</Text>
            <Text style={styles.listItems}>Description: {breedDetails.data.attributes.description}</Text>
            {/* Display other attributes as needed */}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dog Facts</Text>
          {dogFacts && dogFacts.data.map((fact: any, index: any) => (
            <Text key={index} style={styles.listItems}>{fact.attributes.fact}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dog Groups</Text>
          {dogGroups && dogGroups.data.map((group: any, index: any) => (
            <Text key={index} style={styles.listItems}>{group.attributes.name}</Text>
          ))}
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#abc',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  breedItem: {
    marginVertical: 10,
  },
  listItems: {
    marginVertical: 8,
    textAlign: 'left',
  },
  breedName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});