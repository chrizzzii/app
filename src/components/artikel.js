import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://180c-180-243-2-148.ngrok-free.app/artikelApp');
        const articlesData = response.data.artikel;
        setArticles(articlesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticles();
  }, []);

  const renderArticleItem = ({ item }) => (
    <View style={styles.articleItemContainer}>
      <Text style={styles.articleTitle}>{item.title}</Text>
      <Text style={styles.articleDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Bacaan</Text>
      <FlatList
        data={articles}
        renderItem={renderArticleItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.articleList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  articleList: {
    flexGrow: 1,
  },
  articleItemContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  articleDescription: {
    fontSize: 16,
    color: '#666',
  },
});

export default Articles;
