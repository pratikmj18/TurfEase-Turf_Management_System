import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, DefaultTheme, HelperText, Text, TextInput, Title, TouchableRipple } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { config } from '../config';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ea', // Purple primary color
    accent: '#03dac4',  // Teal accent color
    background: '#f6f6f6', // Light gray background
  },
};

const UserLoginForm = () => {
  const navigation = useNavigation();
  const [loginRequest, setLoginRequest] = useState({
    emailId: '',
    password: '',
    role: 'customer', // Set role by default to 'customer'
  });

  const handleUserInput = (name, value) => {
    setLoginRequest({ ...loginRequest, [name]: value });
  };

  const onRegister = () => {
    navigation.navigate("Register");
  };

  const loginAction = async () => {
    try {
      const response = await axios.post(`${config.server}/api/user/login`, loginRequest);
      const res = response.data;

      if (res.success) {
        if (res.user.jwtToken) {
          if (res.user.role === 'admin') {
            await AsyncStorage.setItem('active-admin', JSON.stringify(res.user));
            await AsyncStorage.setItem('admin-jwtToken', res.user.jwtToken);
          } else if (res.user.role === 'customer') {
            await AsyncStorage.setItem('active-customer', JSON.stringify(res.user));
            await AsyncStorage.setItem('customer-jwtToken', res.user.jwtToken);
          }

          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: res.responseMessage,
            position: 'top',
          });

          setTimeout(() => {
            navigation.navigate('temp'); // Redirect using react-navigation's navigate
          }, 2000);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: res.responseMessage,
            position: 'top',
          });
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'It seems the server is down',
          position: 'top',
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'It seems the server is down',
        position: 'top',
      });
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardHeader}>Login</Title>

          <TextInput
            label="Email Id"
            mode="outlined"
            style={styles.input}
            onChangeText={(value) => handleUserInput('emailId', value)}
            value={loginRequest.emailId}
            keyboardType="email-address"
            autoCapitalize="none"
            theme={{ colors: { primary: theme.colors.primary } }}
          />
          <HelperText type="error" visible={loginRequest.emailId === ''}>
            Email Id is required
          </HelperText>

          <TextInput
            label="Password"
            mode="outlined"
            style={styles.input}
            onChangeText={(value) => handleUserInput('password', value)}
            value={loginRequest.password}
            secureTextEntry={true}
            autoCapitalize="none"
            theme={{ colors: { primary: theme.colors.primary } }}
          />
          <HelperText type="error" visible={loginRequest.password === ''}>
            Password is required
          </HelperText>

          <Button 
            mode="contained" 
            onPress={loginAction} 
            style={styles.button}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            theme={{ colors: { primary: theme.colors.primary } }}
          >
            Login
          </Button>

          <TouchableRipple onPress={onRegister} style={styles.registerContainer}>
            <Text style={styles.registerText}>
              Don't have an account yet? <Text style={styles.registerTextHighlight}>Register here</Text>
            </Text>
          </TouchableRipple>
        </Card.Content>
      </Card>

      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
    elevation: 4,
  },
  cardHeader: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: theme.colors.primary,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 20,
    borderRadius: 25,
    elevation: 3,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    marginTop: 20,
  },
  registerText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#444',
  },
  registerTextHighlight: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});

export default UserLoginForm;
