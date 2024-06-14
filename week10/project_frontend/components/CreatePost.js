import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Form from './Form';
import { Alert, View, Text } from 'react-native';

const URL = "http://localhost:3000/api";

const createPost = ({ queryClient }) => {
  // const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [succesMessage, setSuccessMessage] = useState();

  const createEmployee = async (newEmployee) => {
    const res = await fetch(`${URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEmployee),
    });    

    const responseData = await res.json();
    console.log('Recieved response:', responseData);

    // if (!res.ok) {throw new Error('Network response not ok')}
    if (!res.ok) {
      const error = new Error(responseData.message || 'Network response not ok');
      error.responseData = responseData;
      throw error;
    }

    return responseData
  }

  const mutation = useMutation({
    mutationKey: ['users'],
    mutationFn: createEmployee,
    onError: (error) => {
      const formattedError = error.message.split(',').join('\n');
      setErrorMessage(formattedError);
      setSuccessMessage();
      // Alert.alert('Error', formattedError);
      
      console.log(formattedError);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      setErrorMessage();
      setSuccessMessage("Successfully Created Employee!");

      // setShowAlert(true);
      Alert.alert('Successful Employee Creation!');
    },
  });

  return (
    <View>
      <Form onSubmit={mutation.mutate} />
      {errorMessage && (
        <View style={{marginLeft: 10}}>
          <Text style={{ fontSize: 20, color: "red" }}>Error:</Text>
          <Text style={{ fontSize: 15, color: "red", marginLeft: 10 }}>{errorMessage}</Text>
        </View>
      )}
      {succesMessage && (
        <Text style={{ fontSize: 20, color: "green", marginLeft: 10 }}>{succesMessage}</Text>
      )}
    </View>
  );
};

export default createPost;