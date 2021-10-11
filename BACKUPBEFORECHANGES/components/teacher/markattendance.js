
import React, {Component, useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator , TouchableOpacity , SafeAreaView } from 'react-native';
import firebase from '../../database/firebase';


export default class markattendance extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      teachernameusedasid: '',
      user : this.props.route.params.user , 
      isLoading: false ,
      classes :  [] ,
      userss :  [] ,
      studentlist :[] ,
      attendance :[]
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
        teachernameusedasid : this.state.user.displayName 
      })
      const usersRef = firebase.firestore().collection('classes')
         usersRef
      .where('teacherid', '==' , this.state.teachernameusedasid )
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
              alert("No classes Assigned for you .ask admin to do it")
              return 0;
          }
      
                      this.setState({
                        isLoading: true,
                        teachernameusedasid : this.state.user.displayName 
                      })
                      const usersRef = firebase.firestore().collection('users')
                        usersRef
                      .where('myclass', '==' , classses[0].id )
                      .get()
                      .then(firestoreDocument => {
                        this.setState({
                          isLoading: false,
                        }) 
                        console.log( firestoreDocument[0] ) ;
                        const studentlist = firestoreDocument.docs.map(doc => doc.data())
                        console.log( studentlist[0] ) ;
                        console.log( studentlist[0].id ) ;
                        console.log( 'this.classes' ) ;
                          if (studentlist[0].displayName.exists) {
                              alert("No students are assigned to your class yet")
                              return 0;
                          }
                      
                          this.setState({
                            studentlist: studentlist,
                          }) 
                    console.log(this.state.studentlist)
                
                      })
                      .catch(error => {
                          alert(error)
                      });


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

  updateatendance = (val, prop , childname ) => {
    const state = this.state;
    state[prop[childname]] = val;
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

  

  markpresent = async  (classid , teacherid  ) => {
    this.setState({
      isLoading: true,
    })

    console.log("cosdsdsdsdsool") ;
    console.log( this.state.name) ;
    console.log("coool") ;
    console.log( this.state.name) ;
    const usersRef = firebase.firestore().collection('attendance')
      usersRef
      .doc(classid)
      .update({teacherid: teacherid})
      .then(() => {
          this.setState({
              isLoading: false,
              }) 
              Alert.alert('Marked present ') 
              setTimeout(() => {
                this.componentDidMount() ;
                this.forceUpdateHandler();
                }, 10);
      
  
          console.log( "hgfg") ;

          this.setState({
              name: '',
           
          })
          })
          .catch((error) => {
              alert(error)
          });
  }
  
  markabsent = async  (classid , teacherid  ) => {
    this.setState({
      isLoading: true,
    })

    console.log("cosdsdsdsdsool") ;
    console.log( this.state.name) ;
    console.log("coool") ;
    console.log( this.state.name) ;
    const usersRef = firebase.firestore().collection('attendance')
      usersRef
      .doc(classid)
      .update({teacherid: teacherid})
      .then(() => {
          this.setState({
              isLoading: false,
              }) 
              Alert.alert('Mark absent') 
              setTimeout(() => {
                this.componentDidMount() ;
                this.forceUpdateHandler();
                }, 10);
      
  
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
       return <Text>No teacher assigned</Text>;
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

{this.state.studentlist.map(item  => {
  return   <View   key={item.id}   style={{ flexDirection: "colum", alignSelf: "center" }} > 
       <View    style={{ flexDirection: "row", alignSelf: "center" }} > 
        <Text  >Student Name  :   </Text>
        <Text  >  {item.displayName}  </Text>          
        </View>
    
           <View    style={{ flexDirection: "row", alignSelf: "center" }} > 
           <CheckboxGroup
              callback={(selected) => { this.updateatendance(selected[0], 'attendance' ,item.displayName )  }}
              iconColor={"#00a2dd"}
              iconSize={10}
              justifyContent = "center"
              checkedIcon="ios-checkbox-outline"
              uncheckedIcon="ios-square-outline"
              checkboxes={[
                {
                  label: "absent", // label for checkbox item
                  value: "absent", // selected value for item, if selected, what value should be sent?
                 // selected: true // if the item is selected by default or not.
                
                },
                {
                  label: "present",
                  value: "present"
                },
              ]}
              labelStyle={{
                color: '#333'
              }}
              rowStyle={{
                flexDirection: 'row'
              }}
              rowDirection={"column"}
            />

         <TouchableOpacity
              // key={item.id}
              activeOpacity={1}
              style={{ marginBottom: 30 }}
              onPress={() => this.markpresent( item.id  )  }
            >            
                <Text style={{  color: '#3740FE' }}>  Present </Text>
            </TouchableOpacity>
         <TouchableOpacity
              // key={item.id}
              activeOpacity={1}
              style={{ marginBottom: 30 }}
              onPress={() => this.markabsent( item.id  )  }
            >            
                <Text style={{  color: '#dc143c' }}>  Absent </Text>
            </TouchableOpacity>
    </View>

  
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