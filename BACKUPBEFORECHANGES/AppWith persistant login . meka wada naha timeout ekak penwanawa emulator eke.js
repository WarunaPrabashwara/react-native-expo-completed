import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }
import firebase from './database/firebase';

const Stack = createStackNavigator();

function MyStack() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {

        setTimeout(() => {
          usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
          }, 000);

    


      } else {
        setLoading(false)
      }
    });
  }, []);

  if (loading) {
    return (
      <></>
    )
  }


  return (
    <Stack.Navigator >
           { user ? (
          <Stack.Screen name="Dashboard" 
          component = {Dashboard}
          initialParams={{ user: user }}
           />
          
        ) : (
          <>
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={
          {title: 'Login'},
          {headerLeft: null} 
        }
      />
      <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{ title: 'Signup' }}
      />       
      <Stack.Screen 
       name="Dashboard" 
       component={Dashboard} 
       options={
         { title: 'Dashboard'  },
         {headerLeft: null} 
       }
      />
          </>
        )}


    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}