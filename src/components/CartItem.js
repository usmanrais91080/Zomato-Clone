import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const CartItem = ({item}) => {
  const [quantities, setQuantities] = useState({
    S: 1,
    M: 1,
    L: 1,
  });

  const updateQuantity = (size, increment) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [size]: prevQuantities[size] + increment,
    }));
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.description}</Text>
        <Text style={styles.roast}>{item.roast}</Text>
        {Object.keys(item.prices).map(size => (
          <View key={size} style={styles.sizeRow}>
            <Text style={styles.size}>{size}</Text>
            <Text style={styles.price}>${item.prices[size]}</Text>
            <View style={styles.quantityControl}>
              <TouchableOpacity
                onPress={() => updateQuantity(size, -1)}
                style={styles.quantityButton}
                disabled={quantities[size] <= 1}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantities[size]}</Text>
              <TouchableOpacity
                onPress={() => updateQuantity(size, 1)}
                style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#AAA',
  },
  roast: {
    fontSize: 12,
    color: '#888',
  },
  sizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  size: {
    fontSize: 16,
    color: '#FFF',
    flex: 1,
  },
  price: {
    fontSize: 16,
    color: '#FFF',
    flex: 1,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#FF7F50',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
  quantity: {
    fontSize: 16,
    color: '#FFF',
  },
});

export default CartItem;
