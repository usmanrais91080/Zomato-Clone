import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import DetailScreenHeader from '../component/DetailScreenHeader';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../constant/colors';
import CustomBtn from '../component/CustomBtn';

const ZomatoProductDetailScreen = ({route}) => {
  const {item} = route.params;
  const [relatedItems, setRelatedItems] = useState([]);
  const navigation = useNavigation();
  const theme = useColorScheme();
  useEffect(() => {
    // Fetch related items from the API
    const fetchRelatedItems = async () => {
      try {
        const response = await fetch('https://dummyjson.com/recipes');
        const data = await response.json();
        // Assuming we fetch all recipes and use some logic to filter related ones
        setRelatedItems(data.recipes || []);
      } catch (error) {
        console.error('Error fetching related items:', error);
      }
    };

    fetchRelatedItems();
  }, [item.id]);

  const renderRelatedItem = ({item}) => (
    <TouchableOpacity
      style={styles.relatedItem}
      onPress={() => navigation.navigate('ZomatoProductDetailScreen', {item})}>
      <Image source={{uri: item.image}} style={styles.relatedItemImage} />
      <Text style={styles.relatedItemName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{flex: 1}}>
        <ImageBackground source={{uri: item.image}} style={styles.bgImg}>
          {/* header */}
          <DetailScreenHeader
            onPress={() => navigation.navigate('ZomatoHome')}
          />
        </ImageBackground>
        {/* details View */}
        <View style={styles.detailsView}>
          <View style={styles.details}>
            {/* name */}
            <Text style={styles.name}>{item.name}</Text>
            {/* rating */}
            <View
              style={{
                flexDirection: 'row',
                gap: responsiveWidth(3),
                marginTop: responsiveHeight(1),
                alignItems: 'center',
              }}>
              <Text style={styles.rating}>{item.rating}</Text>
              <Text style={styles.review}>{'(' + item.reviewCount + ')'}</Text>
            </View>
            {/* instruction */}
            <Text style={styles.instructionsTitle}>Instructions</Text>
            <Text style={styles.instructions}>{item.instructions}</Text>
            {/* button */}
            <View style={{marginTop: responsiveHeight(3)}}>
              <CustomBtn
                backgroundColor={Colors.primary}
                width={responsiveWidth(90)}
                title={'Buy Now'}
                titleColor={'white'}
              />
            </View>
          </View>
          {/* Related Items */}
          <View style={styles.relatedItemsContainer}>
            <Text style={styles.relatedItemsTitle}>Related Items</Text>
            <FlatList
              data={relatedItems}
              renderItem={renderRelatedItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.relatedItemsList}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ZomatoProductDetailScreen;

const styles = StyleSheet.create({
  bgImg: {
    width: responsiveWidth(100),
    height: responsiveHeight(51),
  },
  detailsView: {
    width: responsiveWidth(100),
    // height: responsiveHeight(50),
    backgroundColor: 'white',
    borderTopLeftRadius: responsiveHeight(6),
    borderTopRightRadius: responsiveHeight(6),
  },
  details: {
    marginTop: responsiveHeight(4),
    marginLeft: responsiveWidth(7),
    marginRight: responsiveWidth(7),
  },
  name: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '800',
    color: Colors.black,
  },

  rating: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: '600',
    color: 'orange',
  },
  review: {
    fontSize: responsiveFontSize(2),
    fontWeight: '400',
    color: 'black',
  },
  instructionsTitle: {
    marginTop: responsiveHeight(1),
    fontSize: responsiveFontSize(2.4),
    fontWeight: '800',
    color: Colors.black,
    marginBottom: responsiveHeight(1),
  },
  instructions: {
    color: Colors.black,
  },
  relatedItemsContainer: {
    marginTop: responsiveHeight(2),
    marginLeft: responsiveWidth(7),
  },
  relatedItemsTitle: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: '800',
    color: Colors.black,
    marginBottom: responsiveHeight(1),
  },
  relatedItemsList: {
    paddingVertical: responsiveHeight(1),
  },
  relatedItem: {
    marginRight: responsiveWidth(3),
    width: responsiveWidth(30),
  },
  relatedItemImage: {
    width: '100%',
    height: responsiveHeight(15),
    borderRadius: responsiveHeight(2),
  },
  relatedItemName: {
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
    marginTop: responsiveHeight(1),
  },
});
