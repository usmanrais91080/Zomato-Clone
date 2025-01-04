import DocumentPicker from 'react-native-document-picker';

export const pickImage = async () => {
  try {
    const response = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.images],
    });
    return response.uri;
  } catch (error) {
    console.log('Error while picking image: ', error);
    throw error;
  }
};
