import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import HomeView from './src/assets/view/HomeView';
import ViewPageOne from './src/assets/view/viewPages/ViewPageOne';
import { Audio } from 'expo-av';

const Stack = createStackNavigator();

export default function App () {

  const [fontsLoaded] = useFonts({
    'PatrickHand': require('./src/assets/font/PatrickHand-Regular.ttf'),
  });

  if(!fontsLoaded){
    return null;
  }
    return (
      <NavigationContainer>
        <StatusBar hidden></StatusBar>
        <Stack.Navigator initialRouteName='ViewPageOne' screenOptions={{
          headerShown: false, gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}>
          <Stack.Screen name="ViewPageOne" component={ViewPageOne} />
          {/* <Stack.Screen name="ModalInfo" component={ModalInfo} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
