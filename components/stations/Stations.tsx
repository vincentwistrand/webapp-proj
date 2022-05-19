import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import FindStation from './FindStation'
import StationInfo from './StationInfo'

const Stack = createNativeStackNavigator();

export default function Stations() {
    return (
        <Stack.Navigator initialRouteName="Sök station">

            <Stack.Screen 
                        name="Sök station" 
                        component={FindStation} 
                        options={{
                            headerStyle: {
                              backgroundColor: '#000000',
                            },
                            headerTintColor: '#FFF',
                            headerTitleAlign: 'center',
                            headerShown: false
                        }} />

            <Stack.Screen 
                        name='Station' 
                        component={StationInfo}
                        options={{
                            headerStyle: {
                              backgroundColor: '#000000',
                            },
                            headerTintColor: '#FFF',
                            headerTitleAlign: 'center',
                            headerShown: false
                        }} />

        </Stack.Navigator>
    );
};
