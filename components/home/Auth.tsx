import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Base } from '../../styles/index.js';
import { Button, Settings, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Login from './Login';
import Register from './Register';
import React, { useEffect, useState } from 'react';
import Favorites from './Favorites';
import authModel from '../../models/auth';
import AppSettings from './AppSettings';
import AddStation from './AddStation';
import SeeMessage from './SeeMessage';
import AllMessages from './AllMessages';

const Stack = createNativeStackNavigator();

export default function Auth() {
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

    async function checkLoggedIn() {
        setIsLoggedIn(await authModel.loggedIn());
    }

    useEffect(() => {
        checkLoggedIn()
    }, []);

    const navigation = useNavigation();
    
    return (
        <View style={Base.base}>
                <Stack.Navigator initialRouteName="Mina sidor">

                    {isLoggedIn ?
                    <Stack.Screen 
                                name="Mina sidor"
                                options={{
                                    headerStyle: {
                                      backgroundColor: '#000000',
                                    },
                                    headerTitleAlign: 'center',
                                    headerTintColor: '#FFF',
                                    headerRight: () => (
                                        <TouchableOpacity onPress={() => navigation.navigate("Inställningar", {reload: true})}>
                                            <Ionicons name="md-settings-outline" 
                                                size={25} 
                                                color="orange" 
                                                />
                                        </TouchableOpacity>
                                    ),
                                    headerLeft: () => (
                                        <TouchableOpacity onPress={() => navigation.navigate('Mina sidor', {reload: true})}>
                                            <Ionicons name="reload" 
                                                size={25} 
                                                color="orange" 
                                                />
                                        </TouchableOpacity>
                                    )
                                }}>
                        {(screenProps) => <Favorites {...screenProps} setIsLoggedIn={setIsLoggedIn} />}
                    </Stack.Screen>:

                    <Stack.Screen 
                        name="Mina sidor"
                        options={{
                            headerStyle: {
                                backgroundColor: '#000000',
                            },
                            headerTitleAlign: 'center',
                            headerTintColor: '#FFF'
                        }}>
                        {(screenProps) => <Favorites {...screenProps} setIsLoggedIn={setIsLoggedIn} />}
                    </Stack.Screen>}

                    <Stack.Screen 
                                name="Inställningar"
                                options={{
                                    headerStyle: {
                                      backgroundColor: '#000000',
                                    },
                                    headerTitleAlign: 'center',
                                    headerTitleStyle: {color:'white'},
                                    headerTintColor: 'orange',
                                    headerRight: () => (
                                        <Ionicons name="add" 
                                            size={30} 
                                            color="orange" 
                                            onPress={() => navigation.navigate("Lägg till station")}/>
                                      )
                                }}>
                        {(screenProps) => <AppSettings {...screenProps} setIsLoggedIn={setIsLoggedIn} />}
                    </Stack.Screen>

                    <Stack.Screen 
                        name="Lägg till station"
                        options={{
                            headerStyle: {
                                backgroundColor: '#000000',
                            },
                            headerTitleAlign: 'center',
                            headerTitleStyle: {color:'white'},
                            headerTintColor: 'orange',
                        }}>
                        {(screenProps) => <AddStation />}
                    </Stack.Screen>

                    <Stack.Screen 
                        name="Meddelande"
                        component={SeeMessage}
                        options={{
                            headerStyle: {
                                backgroundColor: '#000000',
                            },
                            headerTitleStyle: {color:'white'},
                            headerTintColor: 'orange',
                            headerTitleAlign: 'center',
                        }}/>

                    <Stack.Screen 
                        name="Meddelanden"
                        component={AllMessages}
                        options={{
                            headerStyle: {
                                backgroundColor: '#000000',
                            },
                            headerTitleStyle: {color:'white'},
                            headerTintColor: 'orange',
                            headerTitleAlign: 'center',
                        }}/>

                    <Stack.Screen 
                                name="Login"
                                options={{
                                    headerStyle: {
                                      backgroundColor: '#000000',
                                    },
                                    headerTitleStyle: {color:'white'},
                                    headerTintColor: 'orange',
                                    headerTitleAlign: 'center',
                                }}>
                        {(screenProps) => <Login {...screenProps} setIsLoggedIn={setIsLoggedIn} />}
                    </Stack.Screen>

                    <Stack.Screen 
                                name="Register"
                                options={{
                                    headerStyle: {
                                      backgroundColor: '#000000',
                                    },
                                    headerTitleStyle: {color:'white'},
                                    headerTintColor: 'orange',
                                    headerTitleAlign: 'center',
                                }}>
                        {(screenProps) => <Register {...screenProps} setIsLoggedIn={setIsLoggedIn} />}
                    </Stack.Screen>

                </Stack.Navigator>
        </View>
    );
};