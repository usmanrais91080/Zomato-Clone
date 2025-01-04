import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useDispatch} from 'react-redux';
import {addItemsToFavourite} from '../zomatoRedux/zomatoCartSlice';

const DetailScreenHeader = ({onPress, route, index, item}) => {
  // const {item} = route.params;
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();
  return (
    <View>
      <View style={styles.backIconMainView}>
        {/* back icon */}
        <View style={styles.backIconView}>
          <TouchableOpacity onPress={onPress}>
            <Image
              source={require('../assets/images/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
        </View>
        {/* heart icon */}
        <View style={styles.backIconView}>
          <TouchableOpacity
            onPress={() => {
              dispatch(addItemsToFavourite(item));
              setSelected(!selected);
            }}>
            <Image
              source={
                selected
                  ? require('../assets/images/heartFill.png')
                  : require('../assets/images/heartOutline.png')
              }
              style={styles.backIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DetailScreenHeader;

const styles = StyleSheet.create({
  backIconMainView: {
    paddingHorizontal: responsiveWidth(3),
    marginTop: responsiveHeight(2.4),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backIconView: {
    width: responsiveWidth(10),
    height: responsiveHeight(5),
    backgroundColor: 'rgba(184, 182, 182, 0.5)',
    borderRadius: responsiveHeight(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    height: responsiveHeight(2.5),
    width: responsiveWidth(5),
    tintColor: 'white',
  },
  heartIcon: {
    height: responsiveHeight(2.5),
    width: responsiveWidth(5),
    tintColor: 'white',
  },
});
