
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import CreatePost from './components/CreatePost'
import PostManager from './components/PostManager';

const queryClient = new QueryClient();

const App = () => {
  return (
    <ScrollView>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={styles.container}>
          <CreatePost queryClient={queryClient} />
          <PostManager queryClient={queryClient} />
        </SafeAreaView>
      </QueryClientProvider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});

export default App;
