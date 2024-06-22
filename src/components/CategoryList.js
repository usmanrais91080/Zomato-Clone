import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {categories} from '../data/Categories';
import {COLORS} from '../theme/theme';

const CategoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const categoriesWithAll = [{id: 'C0', name: 'All'}, ...categories];

  return (
    <View style={{paddingHorizontal: 10, marginTop: hp(3)}}>
      <FlatList
        horizontal
        data={categoriesWithAll}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={styles.continer}
              onPress={() => {
                setSelectedCategory(index);
              }}>
              <Text
                style={[
                  styles.categoryText,
                  {
                    color:
                      selectedCategory == index
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryLightGreyHex,
                  },
                ]}>
                {item.name}
              </Text>
              {/* ************************ DOT BELOW CATEGORY ************************* */}
              {selectedCategory == index ? (
                <View
                  style={[
                    styles.dotBelowCategory,
                    {
                      backgroundColor:
                        selectedCategory == index
                          ? COLORS.primaryOrangeHex
                          : COLORS.primaryLightGreyHex,
                    },
                  ]}
                />
              ) : null}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  continer: {
    marginLeft: 10,
  },
  categoryText: {
    fontSize: hp(2),
    fontWeight: '600',
    fontFamily: 'Poppins-Thin.ttf',
  },
  dotBelowCategory: {
    height: hp(1.2),
    width: hp(1.2),
    borderRadius: 20,
    marginTop: hp(0.5),
    alignSelf: 'center',
  },
});
