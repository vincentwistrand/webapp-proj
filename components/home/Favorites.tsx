import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { Typography, Base } from '../../styles/index.js';
import React, { useState, useEffect } from 'react';
import authModel from "../../models/auth";
import * as Updates from 'expo-updates';
import storage from '../../models/storage';
import delaysModel from '../../models/delays';
import stationsModel from '../../models/stations';
import Delay from '../../interface/delay.js';
import messageModel from '../../models/messages';
import Message from '../../interface/messages';
import { Ionicons } from '@expo/vector-icons';

export default function Favorites({ route, navigation }) {
    const { reload } = route.params || false;
    const [delayList, setDelayList] = useState <Array<Object>> ([]);
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

    async function reloadContent() {
        const loggedIn = await authModel.loggedIn();
        setIsLoggedIn(loggedIn);

        if (loggedIn) {
            const currentUser = await storage.readCurrentUser();
            const allUserData = await authModel.getUserData();
            const delays = await delaysModel.getDelays();
            const stations = await stationsModel.getStations();
            const messages = await messageModel.getMessages();

            //Get current user's data 
    
            let currentUserData = {};
            let authorizedUserId = 0;
    
            allUserData.forEach(user => {
                if (user.email === currentUser.email) {
                    currentUserData = user;
                    authorizedUserId = user.id;
                }
            });

            if (authorizedUserId != 0 ) {
                //Make an array of all relevant delay objects

                let artefactObject = JSON.parse(currentUserData.artefact);
                let favoriteStationsList = artefactObject.station.split(",");
    
                let favoriteStationsDelays: Array<Delay> = []
    
                favoriteStationsList.forEach((locationSignature: string) => {
                    delays.forEach(delay => {
                        if (delay.FromLocation && delay.ToLocation) {
                            if (delay.ToLocation[0].LocationName === locationSignature) {
                                favoriteStationsDelays.push(delay)
                            }
                        }
                    });
                });

                //Sort delay array 

                favoriteStationsDelays.sort(
                    function(a, b) {
                        if (Number(a.AdvertisedTrainIdent) === Number(b.AdvertisedTrainIdent)) {
                            return new Date(b.EstimatedTimeAtLocation).getTime() - new Date(a.EstimatedTimeAtLocation).getTime();
                        }
                        return Number(a.AdvertisedTrainIdent) > Number(b.AdvertisedTrainIdent) ? 1 : -1;
                    }
                )


                //Make an array with station names and it's delay objects
    
                let favoriteStationNames: Array<{stationName: string, stationSignature: string}> = []
                let stationsSignatureAndName: Array<{stationName: string, stationSignature: string}> = [];

                stations.forEach(station => {
                    if (favoriteStationsList.includes(station.LocationSignature)) {
                        favoriteStationNames.push({stationName: station.AdvertisedLocationName, stationSignature: station.LocationSignature});
                    }

                    stationsSignatureAndName.push({stationName: station.AdvertisedLocationName, stationSignature: station.LocationSignature})
                });

    
                let stationNameDelays: { station: string; stationDelays: Delay[]; warningMessage: Message[] }[] = [];
    
                favoriteStationNames.forEach(name => {
                    let delayList: Delay[] = [];
    
                    favoriteStationsDelays.forEach(delay => {
                        if (delay.ToLocation[0].LocationName === name.stationSignature) {
                            delayList.push(delay);
                        }
                    });

                    //console.log(messages[0]);

                    let stationMessage: Array<Message> = [];
                    messages.forEach((message: Message) => {
                        if (message.TrafficImpact) {
                            message.TrafficImpact.forEach((trafficImpact: { IsConfirmed: any; ToLocation: string | string[]; AffectedLocation: string | string[]; }) => {
                                if (trafficImpact.IsConfirmed) {
                                    if (trafficImpact.ToLocation) {
                                        if ( trafficImpact.ToLocation.includes(name.stationSignature) ) {
                                            stationMessage.push(message);
                                        }
                                    }
                                        
                                    if (trafficImpact.AffectedLocation) {
                                        if ( trafficImpact.AffectedLocation.includes(name.stationSignature) ) {
                                            stationMessage.push(message);
                                        }
                                    }
                                }
                            });
                        }
                    });

                    stationMessage = stationMessage.filter(function(elem, index, self) {
                        return index === self.indexOf(elem);
                    })
    
                    stationNameDelays.push({station: name.stationName, stationDelays: delayList, warningMessage: stationMessage});
                });

                function timeFormat (date: string) {
                    let newTime = date.substring(11, date.length -13)
                    return newTime;
                }
    
                const listOfDelays = stationNameDelays
                .map((delay, index) => {
                    let counter = 1;
                    let trainList: Array<String> = [];
                    const delays = delay.stationDelays.map((delay, index) => {
                        if (!trainList.includes(delay.AdvertisedTrainIdent)) {
                            trainList.push(delay.AdvertisedTrainIdent);

                            let color = 'black';
                            if (counter % 2) {
                            color = '#232323';
                            }
        
                            counter += 1;
    
                            const station = stationsSignatureAndName.find((obj) => {
                                return obj.stationSignature === delay.FromLocation[0].LocationName;
                            });
    
                            var time = (new Date(delay.EstimatedTimeAtLocation).getTime() - new Date(delay.AdvertisedTimeAtLocation).getTime()) / 60000;
    
                            return <View key={index} style={[Base.favoriteStationInfo, { backgroundColor: color }]}>
                                        <Text style={Base.whiteText}>Tåg {delay.AdvertisedTrainIdent} från {station?.stationName}  |  <Text style={Base.redText}>Ny ankomsttid: {timeFormat(delay.EstimatedTimeAtLocation)}</Text></Text>

                                        {delay.Canceled ? <Text style={Base.redText}>Inställt</Text>:null}
                                    </View>
                        } else {
                            return;
                        }
                    })

                    var checkMessages = null;
                    if (delay.warningMessage.length != 0) {
                        checkMessages = <TouchableOpacity
                                            style={{flexDirection: 'row', marginLeft: 5}}
                                            onPress={() => {navigation.navigate('Meddelanden', {messages: delay.warningMessage})}}>
                                            <Ionicons name="warning" 
                                                size={20} 
                                                color="orange" 
                                            />
                                            <Text style={[Typography.p, {marginTop: 2, marginLeft: 0, fontSize: 17, marginRight: 10}]}>Meddelanden</Text>
                                        </TouchableOpacity>
                    }

                    return <View key={index} style={{marginTop: 10}}>
                                <View style={{ justifyContent: 'space-between'}}>
                                    <Text style={[Base.whiteText, { fontSize: 30, marginBottom: 5, marginLeft: 10 }]}>{delay.station}</Text>
                                    {checkMessages}
                                </View>
                                {delay.stationDelays.length === 0 ? 
                                <Text style={[Base.greenText, {marginLeft: 10, marginBottom: 10}]}>Inga förseningar för inkommande tåg</Text>:
                                <View>{delays}</View>}
                            </View>
                });

                setDelayList([listOfDelays]);
            }
        }
    }

    if (reload) {
        reloadContent();
        route.params = false;
    }

    useEffect(() => {
        reloadContent()
        navigation.navigate('Mina sidor', {reload: true});
    }, []);

    return (
        <ScrollView>
            <View style={Base.main}>

                {isLoggedIn ? 
                    <View>
                        {!delayList[0] || delayList[0].length === 0 ? <Text style={[Typography.p, {textAlign: 'center', marginTop: 50}]}>Inga favoritstationer tillagda</Text>: delayList[0]}
                    </View>:
                    <>
                        <View  style={Base.mainPadding}>
                        <Text style={Typography.p}>Logga in för att kunna lägga till favoritstationer</Text>
                        <TouchableOpacity
                            style={Base.loginScreenButton}
                            onPress={() => {
                                navigation.navigate("Login");
                            }}
                        >
                        <Text style={Base.loginText}>Logga in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={Base.loginScreenButton}
                            onPress={() => {
                                navigation.navigate("Register");
                            }}
                        >
                        <Text style={Base.loginText}>Registrera ny användare</Text>
                        </TouchableOpacity>
                        </View>
                    </>
                }
                
            </View>
        </ScrollView>
    );
};