import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ImageContext = createContext();

export const ImageProvider = ({children}) => {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    // Load the image URI from AsyncStorage when the app starts
    //yhna pehle jab app refresh hoga tu ye image ko load krega
    const loadImageUri = async () => {
      try {
        const storedUri = await AsyncStorage.getItem('profileImageUri');
        if (storedUri) {
          setImageUri(storedUri);
        }
      } catch (error) {
        console.error('Failed to load image URI from AsyncStorage', error);
      }
    };

    loadImageUri();
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
    <ImageContext.Provider value={{imageUri, setImageUri: setImageUriAndSave}}>
      {children}
    </ImageContext.Provider>
  );
};
