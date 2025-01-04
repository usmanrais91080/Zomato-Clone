import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

// Get screen width and height
const {width, height} = Dimensions.get('window');

const ImageCard = ({item, onImageClick}) => {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.card} onPress={onImageClick}>
        <Image source={{uri: item.imageUrl}} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    margin: 5,
  },
  card: {
    width: width * 0.45, // 45% of screen width
    height: height * 0.3, // 30% of screen height
    backgroundColor: 'lightgrey',
    elevation: 2,
    borderRadius: 8,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
