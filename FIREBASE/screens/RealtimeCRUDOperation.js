// import {
//   ActivityIndicator,
//   Alert,
//   FlatList,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import React, {useEffect, useRef, useState} from 'react';
// import {Input, MyButton, UsersCard} from '../component';
// import {getUsers, updataUser, delteUser, addUser} from '../utils/RealtimeCRUD';

// const RealtimeCRUDOperation = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [allUsers, setAllUsers] = useState([]);
//   const [editId, setEditID] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const inputRef = useRef();

//   // Fetch users
//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const userList = await getUsers();
//       console.log('Fetched Users:', userList);
//       setAllUsers(userList);
//       setLoading(false);
//     } catch (error) {
//       Alert.alert('Error', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Handle submit
//   const handleSubmit = async () => {
//     if (!name || !email || !phone) {
//       Alert.alert('Warning', 'Fill all fields');
//       return;
//     }

//     const userData = {name, email, phone};
//     try {
//       if (editId) {
//         await updataUser(editId, userData);
//         Alert.alert('Success', 'User updated successfully');
//       } else {
//         await addUser(userData);
//         Alert.alert('Success', 'User added successfully');
//       }
//       // Reset form fields and refetch users
//       setName('');
//       setEmail('');
//       setPhone('');
//       setEditID(null);
//       fetchUsers();
//     } catch (error) {
//       Alert.alert('Error', error);
//     }
//   };
//   // handle delte
//   const handleDelete = async id => {
//     try {
//       await delteUser(id); // Delete the user from Firestore
//       console.log('User Deleted');

//       // Remove the deleted user from the state
//       setAllUsers(allUsers.filter(user => user.id !== id));
//     } catch (error) {
//       Alert.alert('Error', error);
//     }
//   };

//   // handle edit
//   const handleEdit = user => {
//     setName(user?.name);
//     setEmail(user?.email);
//     setPhone(user?.phone);
//     setEditID(user?.id);
//   };

//   return (
//     <View style={styles.container}>
//       <Text
//         style={{
//           textAlign: 'center',
//           marginTop: 50,
//           fontWeight: '800',
//           fontSize: 25,
//         }}>
//         {editId ? 'Update User' : 'Add User'}
//       </Text>

//       <Input
//         ref={inputRef}
//         placeholder={'Enter your name'}
//         value={name}
//         onChangeText={setName}
//       />
//       <Input
//         placeholder={'Enter your email'}
//         value={email}
//         onChangeText={setEmail}
//       />
//       <Input
//         placeholder={'Enter your phone'}
//         value={phone}
//         onChangeText={setPhone}
//       />
//       <MyButton title={editId ? 'Update' : 'Add'} onPress={handleSubmit} />

//       {/* FlatList to render user cards */}
//       <View style={{marginTop: 50}}>
//         {loading ? (
//           <ActivityIndicator color={'red'} size={25} />
//         ) : (
//           <FlatList
//             data={allUsers}
//             renderItem={({item}) => (
//               <UsersCard
//                 item={item}
//                 handleDelete={handleDelete}
//                 handleEdit={handleEdit}
//               />
//             )}
//             keyExtractor={item => item.id.toString()}
//           />
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f7f7f7',
//   },
// });

// export default RealtimeCRUDOperation;
