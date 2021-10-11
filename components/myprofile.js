// components/dashboard.js

import React, { Component } from 'react';
import { StyleSheet, View, Text, Button , SafeAreaView } from 'react-native';
import firebase from '../database/firebase';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

function  signOutOut  ()  {
  console.log('hi');
}  
export default class myprofile extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      uid: '',
      user : this.props.route.params.user
    }
    
    console.log(this.state.user);
   // console.log(user);
    console.log(this.props.route.params.user.index);
  }

  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  } 
   
  deleteAccount = () => {
    const usersRef = firebase.firestore().collection('users')
    usersRef.doc(this.props.route.params.user.id)
    .delete(() => {
      console.log( "user deleted") ;
      this.props.navigation.navigate('Login')
    })
    .catch((error) => {
        alert(error)
    });
     
  }  

  render() {
    this.state = { 
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid
    }    
    return (
      <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
            
                    <View style = { {    alignSelf: 'center',} } >
                    <Text style = {styles.textStyle}>
                      Hello  {this.state.displayName}
                    </Text>
                    </View>
      <View style={styles.container}>

        <View   style={{ flexDirection: "row", alignSelf: 'center' }} >
        <Text style = {styles.textStyle}>Name :  </Text>
        <Text style = {styles.textStyle}>  {this.props.route.params.user.index} </Text>
        </View>


        <View   style={{ flexDirection: "row", alignSelf: 'center' }} >
        <Text style = {styles.textStyle}>Email :  </Text>
        <Text style = {styles.textStyle}>  {this.props.route.params.user.email}  </Text>
        </View>


        <View   style={{ flexDirection: "row", alignSelf: 'center' }} >
        <Text style = {styles.textStyle}>Phone No :  </Text>
        <Text style = {styles.textStyle}>  {this.props.route.params.user.phoneno} </Text>
        </View>


        <View   style={{ flexDirection: "row", alignSelf: 'center' }} >
        <Text style = {styles.textStyle}>Index No :  </Text>
        <Text style = {styles.textStyle}>  {this.props.route.params.user.index}</Text>
        </View>


        <View   style={{ flexDirection: "row", alignSelf: 'center' }} >
        <Text style = {styles.textStyle}>My class :   </Text>
        <Text style = {styles.textStyle}>  {this.props.route.params.user.myclass} </Text>
        </View>


  
   

        
        <View
            style={{ marginTop: 10, padding: 15, backgroundColor: "white" }}
          ></View>

                <View
            style={{ marginTop: 10, padding: 15, backgroundColor: "white" }}
          ></View>
        <Button
          style={styles.botton}
          title="Change password"
          onPress={() => this.props.navigation.navigate('changepassword')}
        />
                <View
            style={{ marginTop: 10, padding: 15, backgroundColor: "white" }}
          ></View>
        <Button
           style={styles.botton}
          title="Logout"
          onPress={() => this.signOut()}
        />
                <View
            style={{ marginTop: 10, padding: 15, backgroundColor: "white" }}
          ></View>
         <Button
           style={styles.botton}
          title="Delete my account"
          onPress={() => this.deleteAccount()}
        />
                <View
            style={{ marginTop: 10, padding: 15, backgroundColor: "white" }}
          ></View>

      </View>
 
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",

    padding: 35,
    backgroundColor: '#fff'
  },
  textStyle: {
      paddingVertical: 1,
      paddingHorizontal: 2,
      color: "black",
        fontSize: 15,
        fontWeight: "900",
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