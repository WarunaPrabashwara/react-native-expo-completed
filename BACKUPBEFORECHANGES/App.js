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
        options={{ title: 'Signup' }}
      />       
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={
          {title: 'Login'},
          {headerLeft: null} 
        }
      />
      <Stack.Screen 
        name="addhomework" 
        component={addhomework} 
        options={
          {title: 'addhomework'},
          {headerLeft: null} 
        }
      />      
      
      <Stack.Screen 
        name="markattendance" 
        component={markattendance} 
        options={
          {title: 'markattendance'},
          {headerLeft: null} 
        }
      />
      <Stack.Screen 
        name="approvstudent" 
        component={approvstudent} 
        options={
          {title: 'approvstudent'},
          {headerLeft: null} 
        }
      />
      <Stack.Screen 
       name="Dashboard" 
       component={Dashboard} 
       options={
         { title: 'Dashboard'  },
         {headerLeft: null} 
       }
      />
            <Stack.Screen 
       name="myprofile" 
       component={myprofile} 
       options={
         { title: 'myprofile'  },
         {headerLeft: null} 
       }
      />
                  <Stack.Screen 
       name="sudentsignup" 
       component={sudentsignup} 
       options={
         { title: 'sudentsignup'  },
         {headerLeft: null} 
       }
      />
                  <Stack.Screen 
       name="teachersignup" 
       component={teachersignup} 
       options={
         { title: 'teachersignup'  },
         {headerLeft: null} 
       }
      />
        <Stack.Screen     name="changepassword"   component={changepassword} 
       options={      { title: 'changepassword'  },    {headerLeft: null}    }     />
      <Stack.Screen     name="admindashboard"      component={admindashboard} 
        options={   { title: 'admindashboard'  },  {headerLeft: null}  } />
              <Stack.Screen     name="viewattendanceofaclass"      component={viewattendanceofaclass} 
        options={   { title: 'viewattendanceofaclass'  },  {headerLeft: null}  } />
              <Stack.Screen     name="addclasses"      component={addclasses} 
        options={   { title: 'addclasses'  },  {headerLeft: null}  } />
              <Stack.Screen     name="approveteachers"      component={approveteachers} 
        options={   { title: 'approveteachers'  },  {headerLeft: null}  } />
              <Stack.Screen     name="assignteacherstoclasses"      component={assignteacherstoclasses} 
        options={   { title: 'assignteacherstoclasses'  },  {headerLeft: null}  } />
              <Stack.Screen     name="viewclasses"      component={viewclasses} 
        options={   { title: 'viewclasses'  },  {headerLeft: null}  } />
              <Stack.Screen     name="viewstudents"      component={viewstudents} 
        options={   { title: 'viewstudents'  },  {headerLeft: null}  } />

              <Stack.Screen     name="viewteacheras"      component={viewteacheras} 
        options={   { title: 'viewteacheras'  },  {headerLeft: null}  } />

<Stack.Screen 
       name="studentDashboard" 
       component={studentDashboard} 
       options={
         { title: 'studentDashboard'  },
         {headerLeft: null} 
       }
      />

<Stack.Screen 
       name="viewhomework" 
       component={viewhomework} 
       options={
         { title: 'viewhomework'  },
         {headerLeft: null} 
       }
      />
<Stack.Screen 
       name="teacherdashboard" 
       component={teacherdashboard} 
       options={
         { title: 'teacherdashboard'  },
         {headerLeft: null} 
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