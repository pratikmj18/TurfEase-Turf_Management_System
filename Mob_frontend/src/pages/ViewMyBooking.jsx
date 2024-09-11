import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { config } from "../config";

const ViewMyBooking = () => {
  const [allBookings, setAllBookings] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await AsyncStorage.getItem("active-customer");
        if (user) {
          const parsedUser = JSON.parse(user); // Parse the user object here
           userId = parsedUser.id;
        
          if (parsedUser && parsedUser.id) {
            retrieveAllBooking(parsedUser.id); // Pass the userId correctly
          } else {
            console.log("User data is missing 'id' property");
          }
        } else {
          console.log("No user data found in AsyncStorage");
        }
      } catch (error) {
        console.log("Error in getting user data:", error);
      }
    };

    getUserData();
  }, []);

  const retrieveAllBooking = async (userId) => {
   // console.log("Retrieving all bookings for user:", userId);
    try {
      const response = await axios.get(
        `${config.server}/api/book/ground/fetch?userId=${userId}`
      );
      setAllBookings(response.data.bookings);
    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  };

  const updateBookingStatus = async (bookingId) => {
    
    try {
      const response = await axios.post(
        `${config.server}/api/book/ground/update/status`,
        {
          bookingId: bookingId,
          status: "Cancel",
        }
      );

      if (response.data.success) {
        Toast.show({
          type: "success",
          text1: response.data.responseMessage,
          position: "top",
        });
        setTimeout(() => {
          retrieveAllBooking(userId); // Reload bookings data
        }, 2000);
      } else {
        Toast.show({
          type: "error",
          text1: "It seems server is down",
          position: "top",
        });
      }
    } catch (error) {
      console.log("Error updating booking status:", error);
    }
  };

  const renderBooking = ({ item }) => (
    <View style={styles.bookingContainer}>
      <Image
        source={{ uri: `${config.server}/api/ground/${item.groundImage}` }}
        style={styles.image}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.groundName}</Text>
        <Text style={styles.text}>Booking ID: {item.bookingId}</Text>
        <Text style={styles.text}>Customer: {item.customerName}</Text>
        <Text style={styles.text}>Contact: {item.customerContact}</Text>
        <Text style={styles.text}>Date: {item.date}</Text>
        <Text style={styles.text}>Time Slot: {item.timeSlot}</Text>
        <Text style={styles.text}>Amount: ${item.price}</Text>
        <Text style={styles.text}>Status: {item.status}</Text>
        {item.status === "Pending" && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => updateBookingStatus(item.id)}
          >
            <Text style={styles.cancelButtonText}>Cancel Booking</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Bookings</Text>
      <FlatList
        data={allBookings}
        renderItem={renderBooking}
        keyExtractor={(item) => item.bookingId.toString()}
      />
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 20,
  },
  bookingContainer: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 10,
  },
  detailsContainer: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333",
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ff4d4d",
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ViewMyBooking;
