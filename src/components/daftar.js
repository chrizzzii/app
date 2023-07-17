import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const Register = ({ navigation }) => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Kirim data pendaftaran ke server
      const response = await axios.post('https://180c-180-243-2-148.ngrok-free.app/user', {
        username,
        email,
        password,
      });
  
      // Tangani respons dari server
      if (response.data && !response.data.success) {
        Alert.alert('Sukses', 'Pendaftaran berhasil!');
        navigation.replace('Login'); // Navigasi ke halaman Login setelah pendaftaran berhasil
      } else {
        Alert.alert('Gagal', 'Pendaftaran gagal. Silakan coba lagi!');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Terjadi kesalahan. Silakan coba lagi!');
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => {navigation.replace('Login');}}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Pendaftaran</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nama:</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={(text) => setName(text)}
          placeholder="Masukkan nama"
          placeholderTextColor="#999"
        />
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Masukkan email"
          placeholderTextColor="#999"
        />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Masukkan password"
          secureTextEntry={true}
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Daftar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: 16,
      },
      backButton: {
        marginLeft: 16,
    },
title: {
    flex: 1,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
},
  formContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Register;
