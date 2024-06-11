// src/components/PostManager.js

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Text, Button, View, FlatList, TextInput, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import Form from './Form';

const fetchPosts = async (userId, postId) => {
  // const response = await fetch(`https://jsonplaceholder.typicode.com/posts${userId ? `?userId=${userId}` : ''}`);
  // const response = await fetch(`https://jsonplaceholder.typicode.com/posts${postId ? `?id=${postId}` : ''}`);
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?${userId ? `userId=${userId}` : ''}&${postId ? `id=${postId}` : ''}`);
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
};

const updatePost = async (updatedPost) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedPost),
  });
  if (!response.ok) throw new Error('Failed to update post');
  return response.json();
};

const patchPost = async ({ id, title }) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) throw new Error('Failed to patch post');
  return response.json();
};

const deletePost = async (id) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete post');
  return response.json();
};

const PostManager = ({ queryClient }) => {
  const [userId, setUserId] = useState('');
  const [postId, setPostId] = useState('');
  const [editPost, setEditPost] = useState(null);

  // const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ['posts', userId, postId],
    queryFn: () => fetchPosts(userId, postId),
  });

  const updateMutation = useMutation({
    mutationKey: ['posts'],
    mutationFn: updatePost,
    onSuccess: () => queryClient.invalidateQueries(['posts']),
  });

  const patchMutation = useMutation({
    mutationKey: ['posts'],
    mutationFn: patchPost,
    onSuccess: () => queryClient.invalidateQueries(['posts']),
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => 
      queryClient.invalidateQueries(['posts'],
      console.log("Delete Success!"),
      ),
  });

  //update post
  const handleUpdate = (data) => {
    updateMutation.mutate({ id: editPost.id, ...data });
    console.log("handleUpdate success!")
    setEditPost(null);
  };

  // ensure only the title of a post i updated
  const handlePatch = (data) => {
    patchMutation.mutate({ id: editPost.id, title: data.title });
    console.log("handlePatch success!")
    setEditPost(null);
  };

  const renderItem = ({ item }) => (
    <View style={{ margin: 15, borderWidth: 1, padding: 5 }}>
      <Text style={{ fontWeight: 'bold' }}>User ID: {"\t"}{item.userId}</Text>
      <Text style={{ fontWeight: 'bold' }}>Post ID: {"\t"}{item.id}</Text>
      <Text style={{ fontWeight: 'bold' }}>Title: {"\t"}</Text>
      <Text>{item.title}</Text>
      <Text style={{ fontWeight: 'bold' }}>Body: {"\n"}</Text>
      <Text>{item.body}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Pressable style={styles.button} onPress={() => setEditPost(item)}>
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => deleteMutation.mutate(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );

  const handleSubmit = (data) => {
    if (editPost.title !== data.title && data.body === editPost.body) {
      handlePatch(data);
    } else {
      handleUpdate(data);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Filter</Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput placeholder="User ID" value={userId} onChangeText={setUserId} style={[styles.input, styles.halfWidth]} />
        <TextInput placeholder="Post ID" value={postId} onChangeText={setPostId} style={[styles.input, styles.halfWidth]} />
      </View>
      <Pressable style={styles.button} onPress={() => queryClient.invalidateQueries(['posts'])}>
        <Text style={styles.buttonText}>Filter</Text>
      </Pressable>
      {editPost && (
        <Form
          onSubmit={handleSubmit}
          initialData={{ title: editPost.title, body: editPost.body, id: editPost.id, userId: editPost.userId }}
        />
      )}
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error loading posts</Text>}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={{ marginTop: 20, borderWidth: 2 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderColor: 'gray', borderWidth: 1, marginBottom: 8, padding: 8 },
  button: { backgroundColor: '#3af' , padding: 10, margin: 5, borderRadius: 5 },
  buttonText: { color: 'white', textAlign: 'center' },
  halfWidth: { flex: 1, marginRight: 8 },
});

export default PostManager;