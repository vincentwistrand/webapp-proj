import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import DelaysMap from './DelaysMap';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DelaysStation from './DelaysStation';
import WalkingDistance from './WalkingDistance';

const Stack = createNativeStackNavigator();

export default function Delays() {
    const navigation = useNavigation();

    return (
        <Stack.Navigator initialRouteName="Förseningar">

            <Stack.Screen 
                        name="Förseningar" 
                        component={DelaysMap}
                        options={{
                            headerStyle: {
                              backgroundColor: '#000000',
                            },
                            headerTintColor: '#FFF',
                            headerTitleAlign: 'center',
                            headerRight: () => (
                                <TouchableOpacity onPress={() => navigation.navigate('Förseningar', {reload: true})}>
                                    <Ionicons name="reload" 
                                        size={25} 
                                        color="orange" 
                                        />
                                </TouchableOpacity>
                            )
                        }}/>

            <Stack.Screen 
                        name="Förseningar per station"
                        component={DelaysStation}
                        options={{
                            headerStyle: {
                                backgroundColor: '#000000',
                            },
                            headerTitleStyle: {color:'white'},
                            headerTintColor: 'orange',
                            headerTitleAlign: 'center',
                        }}/>
            
            <Stack.Screen 
                        name="Gångavstånd"
                        component={WalkingDistance}
                        options={{
                            headerStyle: {
                                backgroundColor: '#000000',
                            },
                            headerTitleStyle: {color:'white'},
                            headerTintColor: 'orange',
                            headerTitleAlign: 'center',
                        }}/>

        </Stack.Navigator>
    );
};