import {firebase} from '@react-native-firebase/auth';
// import {initializeApp} from 'firebase/app';
const firebaseConfig = {
  apiKey: 'AIzaSyAV_HbcU7sDIqOWmHr9_frEjRkwER2rHcs',
  authDomain: 'myapp-6c90f.firebaseapp.com',
  projectId: 'myapp-6c90f',
  storageBucket: 'myapp-6c90f.appspot.com',
  messagingSenderId: '16085923429',
  appId: '1:16085923429:web:f7fd9b901eb14548e7788c',
};

//initilize app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export {firebase};
