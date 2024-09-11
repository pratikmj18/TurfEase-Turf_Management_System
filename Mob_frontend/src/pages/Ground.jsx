import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Image, Platform, ScrollView, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { config } from "../config";

const Ground = () => {
  const route = useRoute();
  const { groundId } = route.params;
  //console.log("id",groundId)

  const [timeSlots, setTimeSlots] = useState([]);
  const [ground, setGround] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    width: "",
    height: "",
    image: "",
  });
  const [booking, setBooking] = useState({
    userId: "",
    groundId: "",
    date: "",
    timeSlot: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  booking.groundId = groundId;

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await AsyncStorage.getItem("active-customer");
      const parsedUser = JSON.parse(user);

      if (parsedUser) {
        setBooking((prevBooking) => ({ ...prevBooking, userId: parsedUser.id }));
      }
    };

    fetchUserData();
  }, []);

  const handleBookingInput = (name, value) => {
    setBooking({ ...booking, [name]: value });
  };

  const retrieveAllSlots = async () => {
    const response = await axios.get(`${config.server}/api/book/ground/fetch/slots`);
    return response.data;
  };

  // useEffect(() => {
  //   const getAllGrounds = async () => {
  //     const allGrounds = await retrieveAllGrounds();
  //     if (allGrounds) {
  //       setGrounds(allGrounds.grounds);
  //     }
  //   };
  //   getAllGrounds();
  // }, []);

  // const retrieveAllGrounds = async () => {
  //   const response = await axios.get(`${config.server}/api/ground/fetch`);
  //   return response.data;
  // };

  const retrieveGround = async () => {
    const response = await axios.get(`${config.server}/api/ground/id?groundId=${groundId}`);
    return response.data;
  };

  useEffect(() => {
    const getGround = async () => {
      const retrievedGround = await retrieveGround();
      setGround(retrievedGround.grounds[0]);
    };
    const getAllSlots = async () => {
      const allSlots = await retrieveAllSlots();
      if (allSlots) {
        setTimeSlots(allSlots);
      }
    };
    getGround();
    getAllSlots();
  }, [groundId]);

  const bookGround = () => {
    fetch(`${config.server}/api/book/ground/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    }).then((result) => {
      result.json().then((res) => {
        if (res.success) {
          ToastAndroid.show(res.responseMessage, ToastAndroid.SHORT);
          console.log("booking", booking);
          
          setTimeout(() => {
            navigation.navigate("UserGroundBookings");
          }, 1000);
        } else {
          ToastAndroid.show("It seems the server is down", ToastAndroid.SHORT);
        }
      });
    });
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      const currentDate = selectedDate.toISOString().split('T')[0];
      setBooking({ ...booking, date: currentDate });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `${config.server}/api/ground/${ground.image}` }}
          style={styles.image}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.groundName}>{ground.name}</Text>
        <Text style={styles.descriptionTitle}>Description:</Text>
        <Text style={styles.description}>{ground.description}</Text>
        <Text style={styles.dimensions}>Width: {ground.width} ft</Text>
        <Text style={styles.dimensions}>Length: {ground.length} ft</Text>
        <Text style={styles.dimensions}>Height: {ground.height} ft</Text>
        <Text style={styles.note}>Note: The price mentioned below is for 1 hour</Text>
        <Text style={styles.price}>Price: ₹{ground.price}</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Booking Date</Text>
        <Button title={booking.date || "Select Date"} onPress={() => setShowDatePicker(true)} />
        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <Text style={styles.label}>Booking Time Slot</Text>
        <Picker
          selectedValue={booking.timeSlot}
          style={styles.input}
          onValueChange={(value) => handleBookingInput("timeSlot", value)}
        >
          <Picker.Item label="Select Time Slot" value="" />
          {timeSlots.map((slot, index) => (
            <Picker.Item key={index} label={slot} value={slot} />
          ))}
        </Picker>
        <Button title="Book Ground" onPress={bookGround} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    padding: 15,
    backgroundColor: "#f5f5f5",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    borderRadius: 10,
  },
  detailsContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  groundName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  dimensions: {
    fontSize: 16,
    color: "#777",
    marginBottom: 5,
  },
  note: {
    fontSize: 14,
    color: "red",
    marginVertical: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginTop: 10,
  },
  form: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
});

export default Ground;
