import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { Typography, Base } from '../../styles/index.js';
import authModel from "../../models/auth";
import * as Updates from 'expo-updates';
import React, { useEffect, useState } from 'react';
import storage from '../../models/storage';
import { Ionicons } from '@expo/vector-icons';
import stationsModel from '../../models/stations';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function AppSettings(route) {
    const { reload } = route.params || false;
    const [currentUser, setCurrentUser] = useState("");
    const [stationList, setStationList] = useState([]);
    const navigation = useNavigation();

    async function reloadContent() {
        const currentUser = await storage.readCurrentUser();
        const allUserData = await authModel.getUserData();
        const stations = await stationsModel.getStations();

        setCurrentUser(currentUser.email);

        let currentUserData = {};
        let authorizedUserId = 0;

        allUserData.forEach(user => {
            if (user.email === currentUser.email) {
                currentUserData = user;
                authorizedUserId = user.id;
            }
        });

        if (authorizedUserId != 0 ) {
            
            let artefactObject = JSON.parse(currentUserData.artefact);
            let favoriteStationsList = artefactObject.station.split(",");
    
            let stationsSignatureAndName: Array<{stationName: string, stationSignature: string}> = [];
    
            stations.forEach(station => {
                stationsSignatureAndName.push({stationName: station.AdvertisedLocationName, stationSignature: station.LocationSignature})
            });
    
            async function deleteFavorite(locationSignature: string) {
                favoriteStationsList.forEach((station: string, index: any) => {
                    if (station === locationSignature) {
                        favoriteStationsList.splice(index, 1)
                    }
                });
                
                let favoriteStationString = "";
                favoriteStationsList.forEach((station: string) => {
                    favoriteStationString += station + ",";
                });
        
                favoriteStationString = favoriteStationString.slice(0, -1);
        
                artefactObject.station = favoriteStationString;
        
                const newArtefact = JSON.stringify(artefactObject);
    
                await authModel.updateUserData(newArtefact, authorizedUserId);
    
                navigation.navigate('Mina sidor', {reload: true})
            }
    
            const listOfFavoriteStations = favoriteStationsList
            .map((locationSignature, index) => {
                if (locationSignature === "") {
                    return;
                }
                const station = stationsSignatureAndName.find((obj) => {
                    return obj.stationSignature === locationSignature;
                });
    
                return <View key={index} style={[Base.favoriteStationInfo, Base.settingsContainer]}>
                            <Text style={[Base.whiteText, Typography.p, Typography.settingsText, {minWidth: 200}]}>{station?.stationName}</Text>
                            <TouchableOpacity onPress={() => {
                                deleteFavorite(locationSignature);
                            }}>
                                <Ionicons name='ios-trash' color={'red'} size={28}/>
                            </TouchableOpacity>
                        </View>
            })
    
            setStationList([listOfFavoriteStations]);
        }
        route.params = false;
    }

    if (reload) {
        reloadContent();
    }

    useEffect(() => {
        reloadContent();
    }, []);

    async function reloadApp () {
        await Updates.reloadAsync();
    }

    return (
        <ScrollView>
            <View style={[Base.mainPadding, {alignItems:'center'}]}>
                <Text style={Typography.p}>Inloggad som {currentUser}</Text>
                <View style={{marginVertical: 30}}>
                    {stationList[0]}
                </View>
                <TouchableOpacity
                        style={[Base.loginScreenButton, {width: 260}]}
                        onPress={async () => {
                            await authModel.logout();
                            reloadApp();
                        }}> 
                        <Text style={Base.loginText}>Logga ut</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};