import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, DefaultTheme, Menu, Provider, TextInput } from "react-native-paper";
import Toast from 'react-native-toast-message';
import { config } from '../config';
// Create a custom theme to override the TextInput text color
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: 'black', // Set text color to black
    primary: '#6200ea', // Set primary color
    accent: '#03dac4',  // Set accent color
    background: '#f6f6f6', // Set background color
  },
};

const Register = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    contact: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
    age: "",
    sex: "",
  });

  const [errors, setErrors] = useState({});
  const navigation = useNavigation();
  const [genders, setGenders] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');

  useEffect(() => {
    const getAllGenders = async () => {
      try {
        const response = await axios.get(`${config.server}/api/user/gender`);
        if (response.data) {
          setGenders(response.data.genders);
        }
      } catch (error) {
        console.error("Error fetching genders", error);
      }
    };

    getAllGenders();
  }, []);

  const handleUserInput = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const validate = () => {
    const errors = {};
    if (!user.firstName) errors.firstName = "First Name is required";
    if (!user.lastName) errors.lastName = "Last Name is required";
    if (!user.emailId) errors.emailId = "Email Id is required";
    if (!user.password) errors.password = "Password is required";
    if (!user.contact) errors.contact = "Contact No is required";
    if (!user.age) errors.age = "Age is required";
    if (!user.street) errors.street = "Street is required";
    if (!user.city) errors.city = "City is required";
    if (!user.pincode) errors.pincode = "Pincode is required";
    if (!user.sex) errors.sex = "Gender is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const cancel = () => {
    navigation.navigate("Login");
    return;
  }

  const saveUser = async () => {
    if (!validate()) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fill all the required fields correctly.',
      });
      return;
    }

    try {
      const response = await axios.post(`${config.server}/api/user/register`, user);
      if (response.data.success) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: response.data.responseMessage,
        });
        setTimeout(() => {
          navigation.navigate("Login");
        }, 1000);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: "It seems server is down",
        });
        setTimeout(() => {
          // Reset form or other actions
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving user", error);
    }
  };

  return (
    <Provider theme={theme}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Register</Text>
          <View style={styles.formGroup}>
            <TextInput
              label="First Name"
              mode="outlined"
              style={styles.input}
              onChangeText={(value) => handleUserInput("firstName", value)}
              value={user.firstName}
              error={!!errors.firstName}
            />
            {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
          </View>
          <View style={styles.formGroup}>
            <TextInput
              label="Last Name"
              mode="outlined"
              style={styles.input}
              onChangeText={(value) => handleUserInput("lastName", value)}
              value={user.lastName}
              error={!!errors.lastName}
            />
            {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
          </View>
          <View style={styles.formGroup}>
            <TextInput
              label="Email Id"
              mode="outlined"
              style={styles.input}
              onChangeText={(value) => handleUserInput("emailId", value)}
              value={user.emailId}
              keyboardType="email-address"
              error={!!errors.emailId}
            />
            {errors.emailId && <Text style={styles.errorText}>{errors.emailId}</Text>}
          </View>
          <View style={styles.formGroup}>
            <TextInput
              label="Password"
              mode="outlined"
              style={styles.input}
              secureTextEntry
              onChangeText={(value) => handleUserInput("password", value)}
              value={user.password}
              error={!!errors.password}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>
          <View style={styles.formGroup}>
            <Menu
              visible={visible}
              onDismiss={() => setVisible(false)}
              anchor={<Button mode="outlined" onPress={() => setVisible(true)}>{selectedGender || 'Select Gender'}</Button>}
            >
              {genders.map((gender) => (
                <Menu.Item key={gender} onPress={() => {
                  setSelectedGender(gender);
                  handleUserInput("sex", gender);
                  setVisible(false);
                }} title={gender} />
              ))}
            </Menu>
            {errors.sex && <Text style={styles.errorText}>{errors.sex}</Text>}
          </View>
          <View style={styles.formGroup}>
            <TextInput
              label="Contact No"
              mode="outlined"
              style={styles.input}
              onChangeText={(value) => handleUserInput("contact", value)}
              value={user.contact}
              keyboardType="numeric"
              error={!!errors.contact}
            />
            {errors.contact && <Text style={styles.errorText}>{errors.contact}</Text>}
          </View>
          <View style={styles.formGroup}>
            <TextInput
              label="Age"
              mode="outlined"
              style={styles.input}
              onChangeText={(value) => handleUserInput("age", value)}
              value={user.age}
              keyboardType="numeric"
              error={!!errors.age}
            />
            {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}
          </View>
          <View style={styles.formGroup}>
            <TextInput
              label="Street"
              mode="outlined"
              style={styles.input}
              onChangeText={(value) => handleUserInput("street", value)}
              value={user.street}
              multiline
              numberOfLines={3}
              error={!!errors.street}
            />
            {errors.street && <Text style={styles.errorText}>{errors.street}</Text>}
          </View>
          <View style={styles.formGroup}>
            <TextInput
              label="City"
              mode="outlined"
              style={styles.input}
              onChangeText={(value) => handleUserInput("city", value)}
              value={user.city}
              error={!!errors.city}
            />
            {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
          </View>
          <View style={styles.formGroup}>
            <TextInput
              label="Pincode"
              mode="outlined"
              style={styles.input}
              onChangeText={(value) => handleUserInput("pincode", value)}
              value={user.pincode}
              keyboardType="numeric"
              error={!!errors.pincode}
            />
            {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}
          </View>
          <View style={styles.buttonGroup}>
            <Button mode="contained" onPress={saveUser} style={styles.button}>
              Submit
            </Button>
            <Button mode="outlined" onPress={cancel} style={[styles.button, styles.cancelButton]}>
              Cancel
            </Button>
          </View>
        </View>
      </ScrollView>
      <Toast />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: '#f6f6f6',
  },
  card: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: '#6200ea',
  },
  formGroup: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    borderColor: '#6200ea',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default Register;
