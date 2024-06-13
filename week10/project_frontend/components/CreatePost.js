import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import Form from './Form';
import { Alert, View } from 'react-native';

const URL = "http://localhost:3000/api";

const createPost = ({ queryClient }) => {
  // const [showAlert, setShowAlert] = useState(false);

  const createEmployee = async (newEmployee) => {
    const res = await fetch(`${URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEmployee),
    });

    if (!res.ok) {throw new Error('Network response not ok')}

    const responseData = await res.json();
    console.log('Recieved response:', responseData);
    return responseData
  }

  const mutation = useMutation({
    mutationKey: ['users'],
    mutationFn: createEmployee,
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      // setShowAlert(true);
      Alert.alert('Successful Employee Creation!');
    },
  });

  // useEffect(() => {
  //   if (showAlert) {
  //     Alert.alert(
  //       "Success!",
  //       "Employee Added Successfully!",
  //       [
  //         {
  //           text: "Yay!",
  //           onPress: () => {
  //             console.log('Yay pressed!');
  //             setShowAlert(false); // Reset alert state
  //           },
  //         },
  //       ]
  //     );
  //   }
  // }, [showAlert]);

  return (
    <View>
      <Form onSubmit={mutation.mutate} />
    </View>
  );
};

export default createPost;