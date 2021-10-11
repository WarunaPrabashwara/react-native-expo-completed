
import React, { Component } from 'react';
import { Picker , StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator , TouchableOpacity } from 'react-native';
import firebase from '../database/firebase';
import { RadioButton } from 'react-native-radio-buttons-group';
import CheckboxGroup from 'react-native-checkbox-group'


export default class sudentsignup extends Component {
  
  constructor() {
    super();
    this.state = { 
      displayName: '',
      email: '', 
      password: '',
      isLoading: false ,
      phoneno: '',
      index :'' ,
      userlevel : 'student' ,
      profilepicturelink : '',
      approvedorrehected : 'pending'  ,
      myclass : 'no class selected',
      classes :  []
    }
  }

  componentDidMount() {

    this.requestingclasses( );
  }

  requestingclasses = async () => {
    this.setState({
        isLoading: true,
      })
      const usersRef = firebase.firestore().collection('classes')
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

  dropdown(){
      console.log("heeee")
      return  <View   style={styles.container2}>
      <Picker
        selectedValue={this.state.myclass}
        style={{ height: 20, width: 150 }}
        onValueChange={(itemValue, itemIndex) => this.setState({myclass: itemValue,})}
      >  
         <Picker.Item     label= {this.state.myclass} value= {this.state.myclass} /> 
           {this.state.classes.map(item  => {     console.log("heeee22" , item.id ) 
                { return <Picker.Item     key={item.id} label= {item.id} value= {item.id} /> }
      })}  
     
        
      </Picker>
    </View>

 
  }
  

   registerUser = async  () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signup!')
    } else {
      this.setState({
        isLoading: true,
      })
      console.log("cooo455858l") ;
      await  firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        this.setState({
          isLoading: false,
        })
        console.log("cosdsdsdsdsool") ;
        const uid = res.user.uid
        console.log(uid) ;
        const displayName = this.state.displayName  ;
        const phoneno  = this.state.phoneno  ;
        const index = this.state.index  ;
        const userlevel = this.state.userlevel  ;
        const profilepicturelink = this.state.profilepicturelink  ;
        const approvedorrehected = this.state.approvedorrehected  ;
        const myclass = this.state.myclass  ;

        console.log( this.state.displayName) ;
        const data = {
            id: uid,
            displayName,
            phoneno,
            index  ,
            userlevel ,
            profilepicturelink ,
            approvedorrehected   ,
            myclass ,  
        };
        console.log("coool") ;
        console.log(data) ;
        console.log( this.state.userlevel) ;
        const usersRef = firebase.firestore().collection('users')
 
        Alert.alert('Submitted for review' , 'Your account was Submitted to review . Request teacher or admin to review you . Once you are accepted to the class you can login with credentials')
        setTimeout(() => {
          usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            console.log( "hgfg") ;
            res.user.updateProfile({
              displayName: this.state.displayName
            })
            console.log("coool2") ;
            this.setState({
              displayName: '',
              email: '', 
              password: '',
              isLoading: false ,
              phoneno: '',
              index :'' ,
              profilepicturelink : '',
              approvedorrehected : 'pending'  ,
              myclass : ''
            })
          })
          .catch((error) => {
              alert(error)
          });
          }, 4000);


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
          placeholder="Name"
          value={this.state.displayName}
          onChangeText={(val) => this.updateInputVal(val, 'displayName')}
        />      
                <TextInput
          style={styles.inputStyle}
          placeholder="Phone number"
          value={this.state.phoneno}
          onChangeText={(val) => this.updateInputVal(val, 'phoneno')}
        />  
                <TextInput
          style={styles.inputStyle}
          placeholder="Index no"
          value={this.state.index}
          onChangeText={(val) => this.updateInputVal(val, 'index')}
        />  

       
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

        <View  style={{ flexDirection: "row", alignSelf: "center" }}  >
          <Text >Select your class    
            </Text>
        {this.dropdown() }
         </View> 
        

         <View
            style={{ marginTop: 10, padding: 15, backgroundColor: "white" }}
          ></View>
        <Button
                 style={styles.botton}
          title="Sign up"
          onPress={() => this.registerUser()}
        />

        <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Login')}>
          Already Registered? Click here to login
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
} ,
container2: {
  flex: 1,
  paddingTop: 5,
  alignItems: "center"
}
});