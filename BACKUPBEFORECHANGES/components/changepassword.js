
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';


export default class changepassword extends Component {
  
  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
      oldpassword : '',
      newpassword :'' ,
      isLoading: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  changepswdd = (currentPassword, newPassword) => {
    this.reauthenticate(currentPassword).then(() => {
        var user = firebase.auth().currentUser;
        user.updatePassword(newPassword).then(() => {
          console.log("Password updated!");
          alert("Password changed successfully.") ;
          setTimeout(() => {
            this.props.navigation.navigate('Login')
            }, 3000);
  
        }).catch((error) => { console.log(error);     this.updateInputVal('', 'oldpassword') ; this.updateInputVal('', 'newpassword') ;    alert("Something went wrong try again.")} );
      }).catch((error) => { console.log(error);       this.updateInputVal('', 'oldpassword') ; this.updateInputVal('', 'newpassword') ;    alert("Something went wrong try again.")} );
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
          placeholder="Enter old password"
          value={this.state.oldpassword}
          onChangeText={(val) => this.updateInputVal(val, 'oldpassword')}
          maxLength={15}
          secureTextEntry={true}
        />   
        
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter new password"
          value={this.state.newpassword}
          onChangeText={(val) => this.updateInputVal(val, 'newpassword')}
          maxLength={15}
          secureTextEntry={true}
        />   
        
        <Button
           style={styles.botton}
          title="Change Password"
          onPress={() => this.changepswdd(this.state.oldpassword , this.state.newpassword)}
        />   
                        
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
    justifyContent: 'center' ,
  }
});