import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext, useEffect, useState} from 'react';
import {View} from 'react-native-reanimated/lib/typescript/Animated';

export const ImageContext = useContext();

export const ImageProvider = ({children}) => {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const loadImgUri = async () => {
      try {
        const storedUri: any = await AsyncStorage.getItem('profileImageUri');
        setImageUri(storedUri);
      } catch (error) {
        console.error('Failed to load image URI from AsyncStorage', error);
      }
    };
    loadImgUri();
  }, []);
  const setImageUriAndSave = async uri => {
    try {
      setImageUri(uri);
      await AsyncStorage.setItem('profileImageUri', uri);
    } catch (error) {
      console.error('Failed to save image URI to AsyncStorage', error);
    }
  };
  return (
    <ImageProvider.Provider value={{imageUri, setImageUri: setImageUriAndSave}}>
      {children}
    </ImageProvider.Provider>
  );
};
