import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    //agr user permission enable krta h tu notification yhna call kr denge
    getfcmToken();
  }
}

export const getfcmToken = async () => {
  let myFMCToken = await AsyncStorage.getItem('fcmtoken');
  console.log('Old FMC Token:', myFMCToken);
  //or agr token asynstoraage me save ni h tu new token generate krde
  if (!myFMCToken) {
    try {
      const myFMCToken = await messaging().getToken();
      //or jab token generate ho jaye tu ose asynstorage me save krdo
      if (myFMCToken) {
        console.log('New Generated Token :=>', myFMCToken);
        await AsyncStorage.setItem('fcmtoken', myFMCToken);
      }
    } catch (error) {
      console.log('Error :=>', error);
    }
  }
};

export const notificationListener = () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    navigation.navigate(remoteMessage.data.type);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log('notification on foreground state..........', remoteMessage);
  });
};
