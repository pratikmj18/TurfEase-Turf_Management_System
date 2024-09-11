import axios from 'axios';
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Card, Text } from "react-native-paper";
import { config } from '../config';
import TurfCard from "./TurfCard"; // Import your TurfCard component
const ShowTurf = () => {
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const retrieveAllGrounds = async () => {
      try {
        const response = await axios.get(`${config.server}/api/ground/fetch`);
        setGrounds(response.data.grounds);
      } catch (error) {
        console.error("Failed to fetch grounds:", error);
      } finally {
        setLoading(false);
      }
    };
    retrieveAllGrounds();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color="#2196F3" size="large" />
        <Text style={styles.loadingText}>Loading Turfs...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.headerCard}>
        <Card.Title title="Available Turfs" titleStyle={styles.headerTitle} />
      </Card>
      <ScrollView contentContainerStyle={styles.grid}>
        {grounds.map((ground) => (
          <TurfCard key={ground.id} item={ground} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    marginTop:25,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: "#2196F3",
  },
  headerCard: {
    marginBottom: 16,
    elevation: 3,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  grid: {
   // flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default ShowTurf;
