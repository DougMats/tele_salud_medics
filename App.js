import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import UserProvider from './contexts/UserProvider'
import Splash from './screens/Splash';
import Login from './screens/Login';
import Register from './screens/Register';
import Forgot from './screens/Forgot';
import Home from './screens/Home';
import Profile from './screens/Profile.js'
import Dashboard from './screens/Dashboard';
import PacienteNew from './screens/PacienteNew';
import MeetAdmin from './screens/MeetAdmin';
import Sala from './screens/Sala.js'
import Meet from './screens/Meet.js'
import Historyclinic from './screens/HistoryClinic.js';
import UploadPhotos from './screens/UploadPhotos.js';
import PacienteView from './screens/PacienteView.js';
import QuotationsList from './screens/QuotationList.js'
import QuotationView from './screens/QuotationView.js'
import Quotation from './screens/Quotation.js';
import Preview from './screens/Preview.js';

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <Stack.Navigator headerMode={'none'}>
          <Stack.Screen headerMode={'none'} name="Home" component={Home} />
          <Stack.Screen headerMode={'none'} name="Splash" component={Splash} />
          <Stack.Screen headerMode={'none'} name="Register" component={Register} />
          <Stack.Screen headerMode={'none'} name="Login" component={Login} />
          <Stack.Screen headerMode={'none'} name="Forgot" component={Forgot} />
          <Stack.Screen headerMode={'none'} name="Dashboard" component={Dashboard} />
          <Stack.Screen headerMode={'none'} name="PacienteNew" component={PacienteNew} />
          <Stack.Screen headerMode={'none'} name="PacienteView" component={PacienteView} />
          <Stack.Screen headerMode={'none'} name="MeetAdmin" component={MeetAdmin} />
          <Stack.Screen headerMode={'none'} name="Profile" component={Profile} />
          <Stack.Screen headerMode={'none'} name="Sala" component={Sala} />
          <Stack.Screen headerMode={'none'} name="Historyclinic" component={Historyclinic} />
          <Stack.Screen headerMode={'none'} name="UploadPhotos" component={UploadPhotos} />
          <Stack.Screen headerMode={'none'} name="Meet" component={Meet} />
          <Stack.Screen headerMode={'none'} name="Quotation" component={Quotation} />
          <Stack.Screen headerMode={'none'} name="QuotationsList" component={QuotationsList} />
          <Stack.Screen headerMode={'none'} name="QuotationView" component={QuotationView} />
          <Stack.Screen headerMode={'none'} name="Preview" component={Preview} />
        </Stack.Navigator>
      </UserProvider>
    </NavigationContainer>
  )
}
console.disableYellowBox = true
export default App;