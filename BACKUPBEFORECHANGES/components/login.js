// components/login.js

import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';


export default class Login extends Component {
  
  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
      isLoading: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  userLogin = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        const uid = res.user.uid
        const usersRef = firebase.firestore().collection('users')
        usersRef
        .doc(uid)
        .get()
        .then(firestoreDocument => {
          this.setState({
            isLoading: false,
            email: '', 
            password: ''
          })
            if (!firestoreDocument.exists) {
                alert("User does not exist anymore.")
                return;
            }
            const user = firestoreDocument.data()
            console.log(user.userlevel) 
            if(user.approvedorrehected == 'approved' ){
                    
                  if(user.userlevel=='admin'){
                    this.props.navigation.navigate('admindashboard', {user: user})
                  }
                  else if (user.userlevel=='student'){
                    this.props.navigation.navigate('studentDashboard', {user: user})
                  }
                  else if(user.userlevel=='teacher'){
                    this.props.navigation.navigate('teacherdashboard', {user: user})
                  }
                  else{
                    this.props.navigation.navigate('Signup')
                  }

            }
            else if ( user.approvedorrehected == 'pending'){
              Alert.alert('pending' , 'Your Request to sign up is still pending . Contact admin or teacher of your class') 
            }
            else if (user.approvedorrehected == 'rejected'){
              Alert.alert('Rejected' , 'Your request to sign up was rejected . please contact admin or teacher') 
            }
        })
        .catch(error => {
            alert(error)
        });


      })
      .catch(error => this.setState({ errorMessage: error.message }))
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <View style={styles.container}>  
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />   
        <Button
          style={styles.botton}
          title="Log in"
          onPress={() => this.userLogin()}
        />   

        <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Signup')}>
          Don't have account? Click here to signup
        </Text>                          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  } ,
  botton: {
  backgroundColor: '#788eec',
  marginLeft: 30,
  marginRight: 30,
  marginTop: 20,
  height: 48,
  borderRadius: 5,
  alignItems: "center",
  justifyContent: 'center'
}
});