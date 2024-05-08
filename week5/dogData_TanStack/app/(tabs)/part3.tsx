import { Image, StyleSheet, Platform, View, Text, TextInput } from 'react-native';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';


interface Breed {
  id: string;
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

const fetchBreedDetails = async (breedId: string) => {
  try{
    const response = await fetch(`https://dogapi.dog/api/v2/breeds/${breedId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch(error) {
    console.error("Failed to fetch breed details:", error);
    throw error;
  }
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TabThreeScreen />
    </QueryClientProvider>
  );
}

function TabThreeScreen() {
  const { data, error, isLoading, isError, isPending, isSuccess } = useQuery({
    queryKey: ["todo"], 
    queryFn: fetchBreeds
  });

  const [breedId, setBreedId] = React.useState("")
  const [text, onChangeText] = React.useState("")

  const handleTextChange = (text: string) => {
    onChangeText(text);
    const breed = data.data.find((b: Breed) => b.attributes.name.toLowerCase() === text.toLowerCase());
    if (breed) {
      fetchBreedDetails(breed.id).then(setBreedId);
    }
  };

  if (isError) return <Text>Error occurred: {error.message}</Text>;
  if (isPending) return <Text>Pending...</Text>;
  if (isLoading) return <Text>Loading...</Text>;
  if (isSuccess) return (
    <ScrollView style={styles.Container}>
      <View style={{paddingHorizontal: 100, paddingVertical: 80, backgroundColor: '#abc'}}>
        <Text style={{fontSize: 40, fontWeight:'bold', marginVertical: 20}}>Part 3</Text>
        <View style={{ flexDirection:'row', flexWrap: 'wrap' }}>
          <Text style={{fontWeight: 'bold'}}>Breeds:{"\t"}</Text>
          {data && data.data.map((breed: Breed, index: number) => (
            <View key={breed.id}>
              <Text>{breed.attributes.name}, </Text>
            </View>
          ))}
        </View>

        <View style={{flexDirection:'row'}}>
          <Text style={{marginVertical: 20, fontWeight:'bold', fontSize: 16}}>Breed Wanted: </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleTextChange}
            value={text}
            placeholder="Enter Dog breed"
          />
        </View>  

        {/* <Text style={styles.input}>{text}, {breedId}</Text> */}

        {breedId? (
          <View>
            <text>Name: {breedId.attributes.name}</text>
            <text>Description: {breedId.attributes.description}</text>
          </View>
        ) : (
          <Text>No Breed Selected</Text>
        )}
        

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
    // gap: 8,
    // marginVertical: 8,
    textAlign: 'left'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
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
