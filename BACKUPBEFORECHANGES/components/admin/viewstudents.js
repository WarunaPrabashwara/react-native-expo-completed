import React, {Component, useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator , TouchableOpacity , SafeAreaView } from 'react-native';
import firebase from '../../database/firebase';


export default class viewstudents extends Component {
  
  constructor() {
    super();
    this.state = { 
      displayName: '',
      name: '', 
      teacherid: '' ,
      isLoading: false ,
      classes :  []
    }
  //  this.classes = this.requestingclasses.bind();
  //  console.log( this.classes ) ;
  }

  componentDidMount() {

    this.requestingclasses( );
  }

  requestingclasses =  () => {
    this.setState({
        isLoading: true,
      })
      const usersRef = firebase.firestore().collection('users')
         usersRef
      .get()
      .then(firestoreDocument => {
        this.setState({
          isLoading: false,
        }) 
        console.log( firestoreDocument[0] ) ;
        const classses = firestoreDocument.docs.map(doc => doc.data())
        console.log( classses[0] ) ;
        console.log( classses[0].id ) ;
        console.log( 'this.classes' ) ;
          if (classses[0].id.exists) {
              alert("No classes available")
              return 0;
          }
      
          this.setState({
            classes: classses,
          }) 
    console.log(this.state.classes)

      })
      .catch(error => {
          alert(error)
      });
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
        <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
                  <View style={styles.container}>

      {this.state.classes.map(item  => {
          if(  item.userlevel == 'student') 
            return (
            <View   key={item.id}   style={{ flexDirection: "row", alignSelf: "center" }} >
                <Text   style={{
              backgroundColor:'#f0ffff' ,
              paddingVertical: 6,
              paddingHorizontal: 16,
              borderRadius: 0,
              color: "black",
                fontSize: 15,
                fontWeight: "900",
            }} >{item.displayName}   </Text>   
             <TouchableOpacity 
            style={{
              backgroundColor:'#fff8dc' ,
              paddingVertical: 6,
              paddingHorizontal: 16,
              borderRadius: 30,
            }}
            onPress={() => this.registerUser()}
          >
            <Text
              style={{
                color: "black",
                fontSize: 15,
                fontWeight: "900",
              }}
            >
             view 
            </Text>
          </TouchableOpacity>   
            <View
              style={{ marginTop: 2, padding: 3, backgroundColor: "white" }}
            ></View>     
            </View>
      )})}
                  </View>
              </SafeAreaView>

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
  }
});