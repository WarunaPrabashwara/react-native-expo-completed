// App.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import myprofile from './components/myprofile';
import sudentsignup from './components/sudentsignup';
import teachersignup from './components/teachersignup';
import changepassword from './components/changepassword';
import admindashboard from './components/admindashboard';
import studentDashboard from './components/studentDashboard';
import teacherdashboard from './components/teacherdashboard';
import viewattendanceofaclass from './components/viewattendanceofaclass';
import addclasses from './components/admin/addclasses';
import approveteachers from './components/admin/approveteachers';
import assignteacherstoclasses from './components/admin/assignteacherstoclasses';
import viewclasses from './components/admin/viewclasses';
import viewstudents from './components/admin/viewstudents';
import viewteacheras from './components/admin/viewteacheras';
import approvstudent from './components/teacher/approvstudent';
import markattendance from './components/teacher/markattendance';
import addhomework from './components/teacher/addhomework';
import viewhomework from './components/viewhomework';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#3740FE',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{ title: 'Signup' } ,
        { headerShown: false } 
      
      }
      />       
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={
          {title: 'Login'},
          { headerShown: false } 
        }
      />
      <Stack.Screen 
        name="addhomework" 
        component={addhomework} 
        options={
          {title: 'addhomework'},
          { headerShown: false } 
        
        }
      />      
      
      <Stack.Screen 
        name="markattendance" 
        component={markattendance} 
        options={
          {title: 'markattendance'},
          { headerShown: false } 
        
        }
      />
      <Stack.Screen 
        name="approvstudent" 
        component={approvstudent} 
        options={
          {title: 'approvstudent'},
          { headerShown: false } 
        
        }
      />
      <Stack.Screen 
       name="Dashboard" 
       component={Dashboard} 
       options={
         { title: 'Dashboard'  },
         { headerShown: false } 
       
       }
      />
            <Stack.Screen 
       name="myprofile" 
       component={myprofile} 
       options={
         { title: 'myprofile'  },
         { headerShown: false } 
       
       }
      />
                  <Stack.Screen 
       name="sudentsignup" 
       component={sudentsignup} 
       options={
         { title: 'sudentsignup'  },
         { headerShown: false } 
       
       }
      />
                  <Stack.Screen 
       name="teachersignup" 
       component={teachersignup} 
       options={
         { title: 'teachersignup'  },
         { headerShown: false } 
       
       }
      />
        <Stack.Screen     name="changepassword"   component={changepassword} 
       options={      { title: 'changepassword'  },     { headerShown: false }   }     />
      <Stack.Screen     name="admindashboard"      component={admindashboard} 
        options={   { title: 'admindashboard'  },   { headerShown: false } } />
              <Stack.Screen     name="viewattendanceofaclass"      component={viewattendanceofaclass} 
        options={   { title: 'viewattendanceofaclass'  },   { headerShown: false }  } />
              <Stack.Screen     name="addclasses"      component={addclasses} 
        options={   { title: 'addclasses'  },   { headerShown: false }  } />
              <Stack.Screen     name="approveteachers"      component={approveteachers} 
        options={   { title: 'approveteachers'  },  { headerShown: false }  } />
              <Stack.Screen     name="assignteacherstoclasses"      component={assignteacherstoclasses} 
        options={   { title: 'assignteacherstoclasses'  },  { headerShown: false } } />
              <Stack.Screen     name="viewclasses"      component={viewclasses} 
        options={   { title: 'viewclasses'  },  { headerShown: false }  } />
              <Stack.Screen     name="viewstudents"      component={viewstudents} 
        options={   { title: 'viewstudents'  },  { headerShown: false }  } />

              <Stack.Screen     name="viewteacheras"      component={viewteacheras} 
        options={   { title: 'viewteacheras'  },  { headerShown: false }  } />

<Stack.Screen 
       name="studentDashboard" 
       component={studentDashboard} 
       options={
         { title: 'studentDashboard'  },
         { headerShown: false }
       }
      />

<Stack.Screen 
       name="viewhomework" 
       component={viewhomework} 
       options={
         { title: 'viewhomework'  },
         { headerShown: false }
       }
      />
<Stack.Screen 
       name="teacherdashboard" 
       component={teacherdashboard} 
       options={
         { title: 'teacherdashboard'  },
         { headerShown: false }
       }
      />


    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}