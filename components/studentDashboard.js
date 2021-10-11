import React, { Component } from 'react';
import { StyleSheet, View, Text, Button , SafeAreaView } from 'react-native';
import firebase from '../database/firebase';

export default class studentDashboard extends Component {
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
        <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
      <View style={styles.container}>
        <Text style = {styles.textStyle}>
          Hello, {this.state.displayName}
        </Text>
        <View
            style={{ marginTop: 10, padding: 15, backgroundColor: "white" }}
          ></View>


<View
            style={{ marginTop: 10, padding: 15, backgroundColor: "white" }}
          ></View>
<Button
             style={styles.botton}
          title="My profile"
          onPress={() => this.props.navigation.navigate('myprofile', {user: this.props.route.params.user })}
        />
                        <View
            style={{ marginTop: 10, padding: 15, backgroundColor: "white" }}
          ></View>

    
                <Button
             style={styles.botton}
          title="View homework"
          onPress={() => this.props.navigation.navigate('viewhomework' , {user: this.props.route.params.user } )}
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  }
  ,
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