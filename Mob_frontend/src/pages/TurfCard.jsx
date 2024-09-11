import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { config } from '../config';

const TurfCard = ({ item }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Image
          source={{ uri: `${config.server}/api/ground/${item.image}` }}
          style={styles.image}
        />
        <View style={styles.cardFooter}>
          <Text style={styles.priceText}>
            {item.name}
          </Text>    
          <Text style={styles.priceText}>
            Price: &#8377;{item.price}
          </Text>  
          
          <Button
            mode="contained"
            onPress={() => navigation.navigate('BookGround', { groundId: item.id })}
            style={styles.button}
          >
            Book Now
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  image: {
    width: '100%',
    height: 270,
    resizeMode: 'cover',
  },
  cardFooter: {
    padding: 10,
    alignItems: 'center',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#6200ee', // Customize button color
  },
});

export default TurfCard;
