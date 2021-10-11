// components/signup.js

import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator , TouchableOpacity } from 'react-native';


export default class Signup extends Component {
  
  constructor() {
    super();
    this.state = { 
      displayName: '',
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
        <Button
                 style={styles.botton}
          title="Sign up as a student"
          onPress={() => this.props.navigation.navigate('sudentsignup')}
        />
                 <View
            style={{ marginTop: 10, padding: 15, backgroundColor: "white" }}
          ></View>
                <Button
                style={styles.botton}
          title="Sign up as a teacher"
          onPress={() => this.props.navigation.navigate('teachersignup')}
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
  checkbox: {
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
  },
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