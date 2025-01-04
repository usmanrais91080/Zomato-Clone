import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {offerBanners} from '../constant/data';

const OfferBanners = () => {
  const carouselRef = useRef(null);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.snapToNext();
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.image} />
      </View>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        ref={carouselRef}
        data={offerBanners}
        renderItem={renderItem}
        sliderWidth={responsiveWidth(100)}
        itemWidth={responsiveWidth(80)}
        loop={true}
        autoplay={true}
        autoplayInterval={4000}
      />
    </View>
  );
};

export default OfferBanners;

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: responsiveHeight(2),
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: responsiveHeight(30), // Adjust the height as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
