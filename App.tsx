// import React, {useEffect} from 'react';
// import {AppNavigator} from './src/navigation/AppNavigator';
// import {Provider} from 'react-redux';
// import store from './src/redux/store';
// import messaging from '@react-native-firebase/messaging';
// import {
//   notificationListener,
//   requestUserPermission,
// } from './src/utils/PushNotifcation-helper';

// const App = () => {
//   useEffect(() => {
//     requestUserPermission();
//     notificationListener();
//   }, []);

//   return (
//     <Provider store={store}>
//       <AppNavigator />
//     </Provider>
//   );
// };

// export default App;

//zomato app

import {ZomatoNavigator} from './zomatoApp/src/navigations/ZomatoNavigator';
import {Provider} from 'react-redux';
import {zomatoStore} from './zomatoApp/src/zomatoRedux/zomatoStore';
import {ImageProvider} from './zomatoApp/src/context/ImageContext';
import {MyAppNavi} from './SocialApp/src/navigation/AppNavigator';
import {JobFinderAppNavi} from './jobFinder/src/navigation/AppNavi';
import {WhatsNavigator} from './whatsappClone/src/navigation/WhtsNavigator';
import RestApiNav from './RESTAPI/navigation/RestApiNav';
import {AsyncthunkNav} from './ASYNTHUNK/navigation/AsyncthunkNav';
import AsynthunkStore from './ASYNTHUNK/hook/AsynthunkStore';
import {FirebaseNav} from './FIREBASE/navigation/FirebaseNav';

const App = () => {
  return (
    // ********* ZOMATO APP ********
    <Provider store={zomatoStore}>
      <ImageProvider>
        <ZomatoNavigator />
      </ImageProvider>
    </Provider>
    // ********* ZOMATO APP ********

    // ********* Social App ********
    // <MyAppNavi />
    // ********* Social App ********

    // ********* job finder App ********
    // <JobFinderAppNavi />
    // ********* job finder App  ********

    // ********* job finder App ********
    // <WhatsNavigator />
    // ********* job finder App  ********

    // ********* Rest Api ********
    // <RestApiNav />
    // ********* Rest Api  ********

    // ********* Asyncthunk ********
    // <Provider store={AsynthunkStore}>
    //   <AsyncthunkNav />
    // </Provider>
    // ********* Asyncthunk  ********

    // ********* FIREBASE ********
    // <FirebaseNav />
    // ********* FIREBASE  ********
  );
};

export default App;
