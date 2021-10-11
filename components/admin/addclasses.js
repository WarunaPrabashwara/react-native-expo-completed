
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator , TouchableOpacity } from 'react-native';
import firebase from '../../database/firebase';


export default class addclasses extends Component {
  
  constructor() {
    super();
    this.state = { 
      displayName: '',
      name: '', 
      teacherid: '' ,
      isLoading: false
   
    }
  }

  
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

   registerUser = async  () => {
    if(this.state.name === '') {
      Alert.alert('Enter details to Enter!')
    } else {
      this.setState({
        isLoading: true,
      })

      console.log("cosdsdsdsdsool") ;
      const name  = this.state.name  ;
      const teacherid = this.state.teacherid  ;
      console.log( this.state.name) ;
      const data = {
          id: name,
          teacherid 
      };
      console.log("coool") ;
      console.log(data) ;
      console.log( this.state.name) ;
      const usersRef = firebase.firestore().collection('classes')
   
        usersRef
        .doc(name)
        .set(data)
        .then(() => {
            this.setState({
                isLoading: false,
                }) 
                Alert.alert('Class added') 

            console.log( "hgfg") ;

            this.setState({
                name: '',
             
            })
            })
            .catch((error) => {
                alert(error)
            });
         

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
          placeholder="name"
          value={this.state.name}
          onChangeText={(val) => this.updateInputVal(val, 'name')}
        />      
           

        <Button
            style={styles.botton}
          title="Add class ( ex : 5 A )"
          onPress={() => this.registerUser()}
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