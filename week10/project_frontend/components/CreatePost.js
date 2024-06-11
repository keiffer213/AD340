import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import Form from './Form';
import { Alert, View } from 'react-native';

const createPost = ({ queryClient }) => {
  const [showAlert, setShowAlert] = useState(false);

  const createPost1 = async (newPost) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    });

    if (!res.ok) {throw new Error('Network response not ok')}

    const responseData = await res.json();
    console.log('Recieved response:', responseData);
    return responseData
  }

  const mutation = useMutation({
    mutationKey: ['posts'],
    mutationFn: createPost1,
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      setShowAlert(true);
    },
  });

  useEffect(() => {
    if (showAlert) {
      Alert.alert(
        "Success!",
        "Post Added Successfully!",
        [
          {
            text: "Yay!",
            onPress: () => {
              console.log('Yay pressed!');
              setShowAlert(false); // Reset alert state
            },
          },
        ]
      );
    }
  }, [showAlert]);

  return (
    <View>
      <Form onSubmit={mutation.mutate} />
    </View>
  );
};

export default createPost;