import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button } from "react-native";
import { Base, Typography } from "../../styles";

import MapView, { Circle } from 'react-native-maps';
import { Marker, Callout } from "react-native-maps";
import MyCustomCalloutView from 'react-native-maps';
import Moment from 'react-moment';

import stationsModel from "../../models/stations";
import delaysModel from "../../models/delays"
import * as Location from 'expo-location';
import delay from "../../interface/delay";
import station from "../../interface/station";
import arrivalsModel from "../../models/arrivals";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function DelaysMap({route, navigation}) {
    const { reload } = route.params || false;
    const [marker, setMarker] = useState<any>(null);
    const [locationMarker, setLocationMarker] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<any>(null);

    async function reloadContent() {
        const stations = await stationsModel.getStations();
        const delays = await delaysModel.getDelays();

        let delayInfo: { delay: delay; station: station; longitude: string; latitude: string;}[] = [];

        let stationNames: { name: string; ackronym: string; }[] = [];

        delays.forEach(delay => {
            stations.forEach(station => {
                if (delay.FromLocation) {
                    if (delay.FromLocation[0].LocationName === station.LocationSignature) {
                        let longitude = station.Geometry.WGS84.split(" ")[1].substring(1);
                        let latitude = station.Geometry.WGS84.split(" ")[2].substring(0, station.Geometry.WGS84.split(" ")[2].length - 1);
                        delayInfo.push({delay: delay, station: station, longitude: longitude, latitude: latitude})
                    }

                    if (delay.ToLocation[0].LocationName === station.LocationSignature) {
                        stationNames.push({
                            name: station.AdvertisedLocationName,
                            ackronym: station.LocationSignature
                        })
                    }
                } 
            });
        });

        let counter = 1;

        const markers = delayInfo
        .map((delay, index) => {
                var time = (new Date(delay.delay.EstimatedTimeAtLocation).getTime() - new Date(delay.delay.AdvertisedTimeAtLocation).getTime()) / 60000;

                const walkingDistance = ((time - 1) * 100) / 2;

                if (counter === 5) {
                    counter = 0;
                } else {
                    counter += 1;
                }

                return  (<Marker
                            coordinate={{ latitude: parseFloat(delay.latitude), longitude: parseFloat(delay.longitude) }}
                            key={index}
                        >
                        <Ionicons name="train" 
                                        size={25} 
                                        color="red" 
                                        />
                        
                        <Callout onPress={() => {navigation.navigate('Förseningar per station', {
                                        delayInfo: delayInfo,
                                        stationName: delay.station.AdvertisedLocationName,
                                        allStationNames: stationNames
                                        })}}>
                            <View style={{height: 100, width:150 }}>
                                <Text>{delay.station.AdvertisedLocationName}</Text>
                                <Text></Text>
                                <Text style={Base.blueText}>Klicka här för att se alla sena tåg från denna station</Text>
                            </View>
                        </Callout>

                        </Marker>)
        
        });

        setMarker(markers);

        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            setErrorMessage('Permission to access location was denied');
            return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});

        setLocationMarker(<Marker
            coordinate={{
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude
            }}
            title="Min plats"
            pinColor="blue"
        />);
    }

    useEffect(() => {
        reloadContent();
    }, []);

    if (reload) {
        reloadContent();
        route.params = false;
    }

    return (
        <View style={Base.base}>
            <View>
                {errorMessage !== null ? <Text style={{color: 'red',}}>{errorMessage}</Text>: null}
            </View>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 63.071343,
                        longitude: 15.386508,
                        latitudeDelta: 17,
                        longitudeDelta: 17,
                    }}>
                    {marker}
                    {locationMarker}
                </MapView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

