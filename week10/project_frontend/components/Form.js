
import React, { useState } from 'react';
import { TextInput, Button, View, StyleSheet, Text, Pressable } from 'react-native';

const Form = ({ onSubmit, initialData = { name: '', email: '', role: '' , showEmployee: false} }) => {
  const [id, setId] = useState(initialData.id);
  const [name, setName] = useState(initialData.name);
  const [email, setEmail] = useState(initialData.email);
  const [role, setRole] = useState(initialData.role);
  const [showEmployee, setShowEmployee] = useState(initialData.showEmployee)

  const handleSubmit = () => {
    onSubmit({ name: name, email: email, role: role });
    // onSubmit({ id: id, name: name, email: email, role: role });
    setName('');
    setEmail('');
    setId('');
    setRole('');
  };

  return (
    <View style={{ width: '98%', alignSelf: 'center', marginVertical: 20 }}>
      <Text style={{ fontSize: 20 }}>Employee Form</Text>
      {/* <View style={{ flexDirection: 'row' }}>
        <TextInput placeholder="ID" value={id} onChangeText={setId} style={[styles.input, styles.halfWidth]} />
        
      </View> */}
      {showEmployee && (
        <Text style={{ fontSize: 15}}>Employee {id}</Text>
      )}
      <TextInput placeholder="Role" value={role} onChangeText={setRole} style={[styles.input]} />
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <Pressable onPress={handleSubmit} style={styles.button}><Text style={styles.buttonText}>SUBMIT</Text></Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  input: { borderColor: 'gray', borderWidth: 1, marginBottom: 8, padding: 8, maxWidth: '98%' },
  halfWidth: { flex: 1, marginRight: 8 },
  button: {padding: 6, borderWidth: 1, backgroundColor: '#3af', borderRadius: 5, borderColor: 'grey', maxWidth: '98%'},
  buttonText: {textAlign: 'center', color: 'white'},
});

export default Form;

