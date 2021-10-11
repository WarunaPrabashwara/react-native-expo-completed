// components/dashboard.js

import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import firebase from '../database/firebase';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      uid: '' ,
      user : this.props.route.params.user
    }
    console.log(this.state.user);
    console.log(this.props.route.params.user.index);
  }

  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }  

  render() {
    this.state = { 
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid 
      
    }    
    return (
      <View style={styles.container}>
        <Text style = {styles.textStyle}>
          Hello, {this.state.displayName}
        </Text>

        <Button
          color="#3740FE"
          title="Logout"
          onPress={() => this.signOut()}
        />

        
<Button
          color="#3740FE"
          title="My profile"
          onPress={() => this.props.navigation.navigate('myprofile', {user: this.props.route.params.user })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  }
});