import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Articles from './artikel';
import axios from 'axios';

const Tab = createBottomTabNavigator();

const Index = ({ navigation, route }) => {
  const [userData, setUserData] = useState(null);
  const { userEmail } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://180c-180-243-2-148.ngrok-free.app/user');
        const users = response.data.user;

        const loggedInUser = users.find((user) => user.email === userEmail);

        setUserData(loggedInUser);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userEmail]);

  const handleLogout = () => {
    navigation.replace('Login');
  };

   return (
    <Tab.Navigator>
      <Tab.Screen name="Home">
        {() => (
          <View style={styles.container}>
            {userData && (
              <View style={styles.header}>
                <Text style={styles.welcomeText}>Selamat Datang, {userData.username}</Text>
                <Button title="Logout" onPress={handleLogout} />
              </View>
            )}
          </View>
        )}
      </Tab.Screen>
      <Tab.Screen name="Artikel" component={Articles} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Index;
