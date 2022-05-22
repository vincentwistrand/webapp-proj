import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlashMessage from "react-native-flash-message"
import { Base } from './styles';
import Auth from './components/home/Auth';
import Delays from './components/delays/Delays';
import Stations from './components/stations/Stations';

const Tab = createBottomTabNavigator();

const navTheme = DefaultTheme;
navTheme.colors.background = '#000000';

const routeIcons = {
  "Favoriter": "star",
  "Sena tåg": "train",
  "Tågtider": "calendar"
};

export default function App() {
    return (
      <SafeAreaView style={Base.base}>
        <NavigationContainer theme={navTheme}>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName = routeIcons[route.name] || "alert";

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'orange',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {backgroundColor: '#000000', borderTopWidth: 0}
            })}
            >
            <Tab.Screen name="Favoriter" 
                        options={{headerShown:false}}>
                {() => <Auth />}
            </Tab.Screen>
            <Tab.Screen name="Sena tåg" 
                        options={{headerShown:false}}>
                {() => <Delays />}
            </Tab.Screen>
            <Tab.Screen name="Tågtider" 
                        options={{headerShown:false}}>
                {() => <Stations/>}
            </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
        <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#000000" translucent = {true}/>
        <FlashMessage position="top" statusBarHeight={70}/>
      </SafeAreaView>
    );
};