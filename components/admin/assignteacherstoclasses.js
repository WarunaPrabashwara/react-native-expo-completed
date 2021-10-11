import React, {Component, useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator , TouchableOpacity , SafeAreaView , ScrollView } from 'react-native';
import firebase from '../../database/firebase';


export default class assignteacherstoclasses extends Component {
  
  constructor() {
    super();
    this.state = { 
      displayName: '',
      name: '', 
      teacherid: '' ,
      isLoading: false ,
      classes :  [] ,
      userss :  []
    }
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  //  console.log( this.classes ) ;
  }

  componentDidMount() {
    this.requestingteachers( );
    this.requestingclasses( );
  }

  forceUpdateHandler(){
    this.forceUpdate();
  };


  requestingclasses =  () => {
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
  requestingteachers =  () => {
    this.setState({
        isLoading: true,
      })
      const usersRef = firebase.firestore().collection('users')
         usersRef
      .where('userlevel', '==' , 'teacher')
     
      .get()
      .then(firestoreDocument => {
        this.setState({
          isLoading: false,
        }) 
        console.log( firestoreDocument[0] ) ;
        const classses = firestoreDocument.docs.map(doc => doc.data())
        console.log( classses[0] ) ;
        console.log( classses[0].id ) ;
        console.log( 'this.userss' ) ;
          if (classses[0].id.exists) {
              alert("No teachers available")
              return 0;
          }
      
          this.setState({
            userss: classses,
          }) 
    console.log(this.state.userss)

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

  

  assignteachertoclass = async  (classid , teacherid  ) => {
    this.setState({
      isLoading: true,
    })

    console.log("cosdsdsdsdsool") ;
    console.log( this.state.name) ;
    console.log("coool") ;
    console.log( this.state.name) ;
    const usersRef = firebase.firestore().collection('classes')
      usersRef
      .doc(classid)
      .update({teacherid: teacherid})
      .then(() => {
          this.setState({
              isLoading: false,
              }) 
              Alert.alert('Added teacher to class') 
              setTimeout(() => {
                this.componentDidMount() ;
                this.forceUpdateHandler();
                }, 2000);
      
  
          console.log( "hgfg") ;

          this.setState({
              name: '',
           
          })
          })
          .catch((error) => {
              alert(error)
          });
  }
  
  renderElement( teacherid){
    if( teacherid == '')
       return <Text   style={{
        color: "black",
          fontSize: 15,
          fontWeight: "600",
      }} >No teacher assigned</Text>;
    return <Text>{teacherid}</Text>;
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
  return   <View   key={item.id}   style={{ flexDirection: "colum", alignSelf: "left" }} > 
       <View    style={{ flexDirection: "row" }} > 
        <Text    style={{
              color: "black",
                fontSize: 15,
                fontWeight: "900",
            }} >Class  :   </Text>
        <Text    style={{
              color: "black",
                fontSize: 15,
                fontWeight: "600",
            }} >  {item.id}  </Text>
        <Text    style={{
              color: "black",
                fontSize: 15,
                fontWeight: "900",
            }}>   Teacher :   </Text>
        { this.renderElement(item.teacherid) }
 
        </View>
        {this.state.userss.map(item2  => {

          return   <View   key={item2.id}   style={{ flexDirection: "row", alignSelf: "center" }} > 
        <Text   style={{
              color: "black",
              paddingVertical: 1,
                fontSize: 15,
                fontWeight: "500",
            }}  >   {item2.displayName} </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
         <TouchableOpacity
              // key={item.id}
              activeOpacity={1}
              style={{ marginBottom: 30 }}
              onPress={() => this.assignteachertoclass( item.id , item2.displayName )  }
            >
              
                <Text     style={{
              backgroundColor:'green' ,
              paddingVertical: 1,
              paddingHorizontal: 2,
              borderRadius: 30,
              color: "white",
                fontSize: 15,
                fontWeight: "500",
            }}  > Assign </Text>
            
            </TouchableOpacity>
            </ScrollView>
    </View>

    })}
  </View>
  })}
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