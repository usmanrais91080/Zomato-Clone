import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {categories} from '../constant/data';
import {Colors} from '../constant/colors';

const Categories = () => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <View
      style={{
        marginTop: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(3),
      }}>
      <FlatList
        horizontal
        data={categories}
        renderItem={({item, index}) => {
          return (
            <View>
              <TouchableOpacity
                style={[
                  styles.contaner,
                  {
                    backgroundColor:
                      isSelected == index ? Colors.primary3 : Colors.white,
                  },
                ]}
                onPress={() => setIsSelected(index)}>
                <Text
                  style={[
                    {fontWeight: '500'},
                    {color: isSelected == index ? 'white' : 'black'},
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  contaner: {
    paddingLeft: responsiveWidth(1.45),
    paddingRight: responsiveWidth(1.45),
    marginRight: responsiveWidth(4),
    height: responsiveHeight(3.9),
    borderRadius: responsiveHeight(2),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: responsiveWidth(0.25),
    borderColor: Colors.gray,
    // width: responsiveWidth(),
  },
});
