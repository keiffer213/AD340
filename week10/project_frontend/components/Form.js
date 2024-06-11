
import React, { useState } from 'react';
import { TextInput, Button, View, StyleSheet, Text, Pressable } from 'react-native';

const Form = ({ onSubmit, initialData = { title: '', body: '', id: '', userId: '' } }) => {
  const [title, setTitle] = useState(initialData.title);
  const [body, setBody] = useState(initialData.body);
  const [id, setId] = useState(initialData.id);
  const [userId, setUserId] = useState(initialData.userId);

  const handleSubmit = () => {
    onSubmit({ title: title, body: body, id: id, userId: userId });
    setTitle('');
    setBody('');
    setId('');
    setUserId('');
  };

  return (
    <View style={{ width: '98%', alignSelf: 'center', marginVertical: 20 }}>
      <Text style={{ fontSize: 20 }}>Form</Text>
      <View style={{ flexDirection: 'row' }}>
        <TextInput placeholder="User ID" value={userId} onChangeText={setUserId} style={[styles.input, styles.halfWidth]} />
        <TextInput placeholder="Post ID" value={id} onChangeText={setId} style={[styles.input, styles.halfWidth]} />
      </View>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Body" value={body} onChangeText={setBody} style={styles.input} />
      <Pressable onPress={handleSubmit} style={styles.button}><Text style={styles.buttonText}>SUBMIT</Text></Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  input: { borderColor: 'gray', borderWidth: 1, marginBottom: 8, padding: 8 },
  halfWidth: { flex: 1, marginRight: 8 },
  button: {padding: 6, borderWidth: 1, backgroundColor: '#3af', borderRadius: 5, borderColor: 'grey'},
  buttonText: {textAlign: 'center', color: 'white'},
});

export default Form;

