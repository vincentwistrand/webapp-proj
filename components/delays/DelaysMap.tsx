import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Base } from "../../styles";
import MapView from 'react-native-maps';
import { Marker, Callout } from "react-native-maps";
import stationsModel from "../../models/stations";
import delaysModel from "../../models/delays"
import * as Location from 'expo-location';
import delay from "../../interface/delay";
import station from "../../interface/station";
import { Ionicons } from '@expo/vector-icons';

export default function DelaysMap({route, navigation}) {
    //Component for showing all stations with delayed trains on a map
    const { reload } = route.params || false;
    const [marker, setMarker] = useState<any>(null);
    const [locationMarker, setLocationMarker] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<any>(null);

    useEffect(() => {
        reloadContent();
    }, []);

    if (reload) {
        reloadContent();
        route.params = false;
    }

    async function reloadContent() {
        route.params = false;
        const stations = await stationsModel.getStations();
        const delays = await delaysModel.getDelays();

        //Make custom objects to be used in DelaysStation to display all delays of a station

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

        const stationNamesNoDuplicates = [...new Map(stationNames.map(item => [JSON.stringify(item), item])).values()];

        //All delay markers

        let counter = 1;
        let trainList: Array<String> = [];

        const markers = delayInfo
        .map((delay, index) => {
            if (!trainList.includes(delay.delay.AdvertisedTrainIdent)) {
                trainList.push(delay.delay.AdvertisedTrainIdent);

                return  (<Marker
                            coordinate={{ latitude: parseFloat(delay.latitude), longitude: parseFloat(delay.longitude) }}
                            key={index}
                            tracksViewChanges={false}
                        >
                        <Ionicons name="train" 
                                        size={25} 
                                        color="red" 
                                        />
                        
                        <Callout onPress={() => {navigation.navigate('Förseningar per station', {
                                        delayInfo: delayInfo,
                                        stationName: delay.station.AdvertisedLocationName,
                                        allStationNames: stationNamesNoDuplicates
                                        })}}>
                            <View style={{height: 100, width:150 }}>
                                <Text>{delay.station.AdvertisedLocationName}</Text>
                                <Text></Text>
                                <Text style={Base.blueText}>Klicka här för att se alla sena tåg från denna station</Text>
                            </View>
                        </Callout>

                        </Marker>)
            }
        });

        //User's position

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

    return (
        <View style={Base.base}>
            <View>
                {errorMessage !== null ? <Text style={{color: 'red',}}>{errorMessage}</Text>: null}
            </View>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 61.471343,
                        longitude: 15.386508,
                        latitudeDelta: 22,
                        longitudeDelta: 22,
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

