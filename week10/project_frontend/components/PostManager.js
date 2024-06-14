// src/components/PostManager.js

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Text, View, FlatList, TextInput, StyleSheet, Pressable } from 'react-native';
import Form from './Form';

const URL = "http://localhost:3000/api";

const EmployeeManager = ({ queryClient }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [employeeRole, setEmployeeRole] = useState('');
  const [editEmployee, setEditEmployee] = useState(null);
  
  // const patchEmployee = async ({ id, role }) => {
  //   const response = await fetch(`${URL}/users/${id}`, {
  //     method: 'PATCH',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ role }),
  //   });
  //   if (!response.ok) throw new Error('Failed to patch post');
  //   return response.json();
  // };

  const fetchEmployee = async (id, role) => {
    const urlFetchId = `${URL}/users${role ? `?role=${role.toUpperCase()}` : ''}`;

    // **FOR some reason I can't fetch a single employee by id
    // const urlFetchRole = `${URL}/users${id ? `/${id}` : ''}`;
    // console.log(URLfetch);
    const response = await fetch(urlFetchId);
    if (!response.ok) {throw new Error('Failed to fetch employee');}
    return response.json();
  };

  // const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ['users', employeeId, employeeRole],
    queryFn: () => fetchEmployee(employeeId, employeeRole),
    // enabled: !employeeId,
  });

  const deleteEmployeeMutation = useMutation({
    mutationKey: ['users'],
    mutationFn: (deletedUser) => {
      return fetch(`${URL}/users/${deletedUser.id}`, {
        method: 'DELETE',
      }).then((res) => res.json())
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    }
  })

  function handleDeleteMutation(deleteEm) {
    // console.log(deleteEm.id);
    // console.log(deleteEm.name);
    deleteEmployeeMutation.mutate(deleteEm);
  }

  const updateEmployee = async (updatedEmployee) => {
    const response = await fetch(`${URL}/users/${updatedEmployee.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEmployee),
    });
    if (!response.ok) throw new Error('Failed to update post');
    return response.json();
  };

  const updateMutation = useMutation({
    mutationKey: ['users'],
    mutationFn: updateEmployee,
    onSuccess: () => queryClient.invalidateQueries(['users']),
  });

  // const patchMutation = useMutation({
  //   mutationKey: ['users'],
  //   mutationFn: patchEmployee,
  //   onSuccess: () => queryClient.invalidateQueries(['users']),
  // });

  //update post
  const handleUpdate = (data) => {
    updateMutation.mutate({ id: editEmployee.id, ...data });
    // console.log("handleUpdate success!")
    setEditEmployee(null);
  };

  // // ensure only the title of a post i updated
  // const handlePatch = (data) => {
  //   patchMutation.mutate({ id: editEmployee.id, title: data.title });
  //   console.log("handlePatch success!")
  //   setEditEmployee(null);
  // };

  const handleSubmit = (data) => {
    // if (editEmployee.id !== data.id && editEmployee.role !== data.role) {
    //   handlePatch(data);
    // } else {
      handleUpdate(data);
    // }
  };

  const renderItem = ({ item }) => (
    <View style={{ margin: 15, borderWidth: 1, padding: 5 }}>
      <Text style={{ fontWeight: 'bold' }}>Employee ID: {"\t"}{item.id}</Text>
      <Text style={{ fontWeight: 'bold' }}>Employee Name: {"\t"}{item.name}</Text>
      <Text style={{ fontWeight: 'bold' }}>Employee Email: {"\t"}{item.email}</Text>
      <Text style={{ fontWeight: 'bold' }}>Employee Role: {"\t"}{item.role}</Text>
 
      <View style={{ flexDirection: 'row' }}>
        <Pressable style={styles.button} onPress={() => setEditEmployee(item)}>
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handleDeleteMutation(item)}>
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Filter</Text>
      <View style={{ flexDirection: 'row' }}>
        {/* <TextInput placeholder="Employee ID" value={employeeId} onChangeText={setEmployeeId} style={[styles.input, styles.halfWidth]} /> */}
        <TextInput placeholder="Employee Role" value={employeeRole} onChangeText={setEmployeeRole} style={[styles.input, styles.halfWidth]} />
      </View>
      {/* <Pressable style={styles.button} onPress={() => queryClient.invalidateQueries(['users'])}>
        <Text style={styles.buttonText}>Filter</Text>
      </Pressable> */}
      {editEmployee && (
        <Form
          onSubmit={handleSubmit}
          initialData={{ id: editEmployee.id, name: editEmployee.name, email: editEmployee.email, role: editEmployee.role, showEmployee: true }}
        />
      )}
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error loading posts</Text>}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={{ marginTop: 20, borderWidth: 2 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16},
  input: { borderColor: 'gray', borderWidth: 1, marginBottom: 8, padding: 8 },
  button: { backgroundColor: '#3af' , padding: 10, margin: 5, borderRadius: 5 },
  buttonText: { color: 'white', textAlign: 'center' },
  halfWidth: { flex: 1, marginRight: 8 },
});

export default EmployeeManager;