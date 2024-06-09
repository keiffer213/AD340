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

interface Group {
  id: number;
  attributes: {
      name: string;
  };
}

interface Fact {
  id: number;
  attributes: {
      body: string;
  };
}

interface FactsProps {
  numberOfFacts: number;
}

interface DogProps {
  dogId: number;
}

interface DogsProps {
  handleDogClick: (id: number) => void;
}

const getDogById = async (id: any) => {
  const response = await fetch(`https://dogapi.dog/api/v2/breeds/${id}`);
  return response.json();
};

const getDogs = async () => {
  const response = await fetch("https://dogapi.dog/api/v2/breeds");
  return response.json();
};

const getFacts = async (numFacts: any) => {
  const response = await fetch(`https://dogapi.dog/api/v2/facts?limit=${numFacts}`);
  return response.json();
};

const getGroups = async () => {
  const response = await fetch("https://dogapi.dog/api/v2/groups");
  return response.json();
};

export default function App() {
  const queryClient = new QueryClient();
  const [selectedId, setSelectedId] = useState(null);

  const handleDogClicked = (id: any) => {
      setSelectedId(id);
  };

  return (
      <QueryClientProvider client={queryClient}>
          <ScrollView style={styles.container}>
              <Dogs handleDogClick={handleDogClicked} />
              {selectedId && <DogDetails dogId={selectedId} />}
              
              <DogFacts numberOfFacts={3} />
              
              <DogGroups />
              
          </ScrollView>
      </QueryClientProvider>
  );
}
const DogGroups = () => {
  const { data: groups, isLoading: groupsLoading, isError: groupsError } = useQuery({
      queryKey: ['groups'],
      queryFn: getGroups
  });

  if (groupsLoading) return <Text>Dog Groups Loading...</Text>;
  if (groupsError) return <Text>Dog Groups Error...</Text>;

  return (
      <View>
          <Text style={styles.heading}>Dog Groups:</Text>
          {groups.data.map((group: { id: React.Key | null | undefined; attributes: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }; }) => 
            <Text key={group.id} style={[styles.content, {marginBottom: 5, padding: 4}]}>{group.attributes.name}</Text>)}
      </View>
  );
};

const DogFacts = ({ numberOfFacts }: FactsProps) => {
  const { data: facts, isLoading: factsLoading, isError: factsError } = useQuery({
      queryKey: ['facts'],
      queryFn: () => getFacts(numberOfFacts)
  });

  if (factsLoading) return <Text>Dog Facts Loading...</Text>;
  if (factsError) return <Text>Dog Facts Error...</Text>;

  return (
      <View>
          <Text style={styles.heading}>Dog Facts:</Text>
          {facts.data.map((fact: { id: React.Key | null | undefined; attributes: { body: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }; }) => 
            <Text key={fact.id} style={[styles.content, {marginBottom: 5, padding: 4}]}>{fact.attributes.body}</Text>)}
      </View>
  );
};

const DogDetails = ({ dogId }: DogProps) => {
  const { data: dog, isLoading: dogLoading, isError: dogError } = useQuery({
      queryKey: ['dog', dogId],
      queryFn: () => getDogById(dogId),
      enabled: !!dogId
  });

  if (dogLoading) return <Text>Loading...</Text>;
  if (dogError) return <Text>Error fetching item...</Text>;

  return (
      <View style={styles.dog}>
          {dog.data.attributes && (
              <View style={styles.content}>
                  <Text style={styles.heading}>{dog.data.attributes.name}</Text>
                  <Text style={{marginBottom: 20}}>{dog.data.attributes.description}</Text>
                  <Text style={{fontWeight:'bold'}}>Life Expectancy: </Text>
                  <Text>Min: {dog.data.attributes.life.min} , Max: {dog.data.attributes.life.max}</Text>
                  <Text style={{fontWeight:'bold'}}>Male Weight: </Text>
                  <Text>Min: {dog.data.attributes.male_weight.min} , Max: {dog.data.attributes.male_weight.max}</Text>
                  <Text style={{fontWeight:'bold'}}>Female Weight: </Text>
                  <Text>Min: {dog.data.attributes.female_weight.min} , Max: {dog.data.attributes.female_weight.max}</Text>
              </View>
          )}
      </View>
  );
};

const Dogs = ({ handleDogClick }: DogsProps) => {
  const { data: dogs, isLoading: dogsLoading, isError: dogsError } = useQuery({
      queryKey: ['dogs'],
      queryFn: getDogs
  });

  if (dogsLoading) return <Text>Loading...</Text>;
  if (dogsError) return <Text>There was an error...</Text>;

  return (
      <View>
          <Text style={styles.heading}>Dogs</Text>
          {dogs.data.map((d: { id: React.Key | null | undefined; attributes: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }; }) => (
              <TouchableOpacity key={d.id} onPress={() => handleDogClick(d.id)}>
                  <Text style={{marginBottom: 4, padding: 4, backgroundColor: '#abb'}}>{d.attributes.name}</Text>
              </TouchableOpacity>
          ))}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#ddd',
      padding: 20,
  },
  dog: {
      marginVertical: 20,
  },
  heading: {
      fontSize: 30,
      fontWeight: 'bold',
      marginVertical: 10,
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