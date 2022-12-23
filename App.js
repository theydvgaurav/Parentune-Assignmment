import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AddAnUser from './components/AddAnUser';
import EditUserDetails from './components/EditUserDetails';
import ViewAllUsers from './components/ViewAllUsers';
import HomeScreen from './components/HomeScreen';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const Stack = createNativeStackNavigator();

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'simple_push',
        }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ViewAllUserScreen" component={ViewAllUsers} />
        <Stack.Screen
          name="EditUserDetailsScreen"
          component={EditUserDetails}
        />
        <Stack.Screen name="AddAnUser" component={AddAnUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
