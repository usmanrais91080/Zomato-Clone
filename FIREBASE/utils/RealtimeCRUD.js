// import database from '@react-native-firebase/database';

// export const addUser = async userData => {
//   try {
//     const userRef = database().ref('/crudUsers').push();
//     await userRef.set(userData);
//   } catch (error) {
//     console.log('ERROR', error);
//   }
// };

// // getusers
// export const getUsers = async () => {
//   try {
//     const snapshot = database().ref('/crudUsers').once('value');
//     const users = (await snapshot).val()
//       ? Object.entries((await snapshot).val()).map(([id, data]) => ({
//           id,
//           ...data,
//         }))
//       : [];
//     return users;
//   } catch (error) {
//     console.log('ERROR while adding users', error);
//   }
// };

// // updata user
// export const updataUser = async (id, updated) => {
//   try {
//     await database().ref(`/crudUsers/${id}`).update(updated);
//   } catch (error) {
//     console.log('ERROR while updating', error);
//   }
// };

// // delete user
// export const delteUser = async id => {
//   try {
//     await database().ref(`/crudUsers/${id}`).remove();
//     console.log('User Removed');
//   } catch (error) {
//     console.log('ERROR while delting', error);
//   }
// };
