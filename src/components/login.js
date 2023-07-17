import React, { useState } from 'react';
import {Alert, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.get('https://180c-180-243-2-148.ngrok-free.app/user');
      const users = response.data.user;

      // Mencari pengguna dengan email yang cocok
      const user = users.find((user) => user.email === email);

      if (user && user.password === password) {
        // Jika autentikasi berhasil
        navigation.replace('Index', { userEmail: email }); // Navigasi ke halaman Index dengan menyertakan email pengguna
      } else {
        // Jika autentikasi gagal
        Alert.alert('Gagal', 'Login gagal. Silakan coba lagi!');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Terjadi kesalahan. Silakan coba lagi!');
    }
  };

  const handleDaftar = () => {
    // Lakukan tindakan logout di sini
    // Contoh: Menghapus token autentikasi dari penyimpanan lokal

    // Pindah ke halaman login setelah logout
    navigation.replace('Daftar');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selamat Datang</Text>
      <View style={styles.formContainer}>
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
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordButtonText}>Lupa Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Belum punya akun?</Text>
        <TouchableOpacity onPress={handleDaftar}>
          <Text style={styles.footerLink}>Daftar Sekarang</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
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
  loginButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    alignItems: 'center',
  },
  forgotPasswordButtonText: {
    color: '#1e90ff',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#333',
  },
  footerLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e90ff',
    marginLeft: 4,
  },
});

export default Login;