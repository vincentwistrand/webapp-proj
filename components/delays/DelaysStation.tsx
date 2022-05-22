import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { Typography, Base } from '../../styles/index.js';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Delay from '../../interface/delay';
import Station from '../../interface/station';

export default function DelaysStation({route, navigation}) {
    //Component showing all delays from a specific station
    const stationName = route.params.stationName;
    const delays = route.params.delayInfo;
    const allStationNames = route.params.allStationNames;

    function ackronymToName (ackronym: string) {
        //Convert LocationSignature to station name
        let name = "";
        allStationNames.forEach(object => {
            if (object.ackronym === ackronym ) {
                name = object.name;
            }
        });
        return name;
    }

    let stationDelays: { delay: Delay; station: Station; longitude: string; latitude: string;}[] = [];

    delays.forEach(delay => {
        if (delay.station.AdvertisedLocationName === stationName) {
            stationDelays.push(delay);
        }
    });

    stationDelays.sort(
        function(a, b) {
            if (Number(a.delay.AdvertisedTrainIdent) === Number(b.delay.AdvertisedTrainIdent)) {
                return new Date(b.delay.EstimatedTimeAtLocation).getTime() - new Date(a.delay.EstimatedTimeAtLocation).getTime();
            }
            return Number(a.delay.AdvertisedTrainIdent) > Number(b.delay.AdvertisedTrainIdent) ? 1 : -1;
        }
    )

    let counter = 1;
    let trainList: Array<String> = [];
    const listOfDelays = stationDelays
    .map((delay, index) => {
        if (!trainList.includes(delay.delay.AdvertisedTrainIdent)) {
            trainList.push(delay.delay.AdvertisedTrainIdent);
            
            let color = 'black';
            if (counter % 2) {
            color = '#232323';
            }
    
            counter += 1;
    
            var minutesLate = (new Date(delay.delay.EstimatedTimeAtLocation).getTime() - new Date(delay.delay.AdvertisedTimeAtLocation).getTime()) / 60000;
            
            return <TouchableOpacity
                        key={index}
                        style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: color, padding: 10}}
                        onPress={() => {navigation.navigate('Gångavstånd', {
                            stationName: stationName,
                            longitude: delay.longitude,
                            latitude: delay.latitude,
                            minutesLate: minutesLate
                        })}}>
                        <View>
                            <Text style={[Typography.p, {marginTop: 5, marginLeft: 10}]}>Tåg {delay.delay.AdvertisedTrainIdent} till {ackronymToName(delay.delay.ToLocation[0].LocationName)}</Text>
                            <Text style={[Typography.p, Base.redText, {marginTop: 5, marginLeft: 10}]}>{minutesLate} min sent</Text>
                        </View>
                        <View style={{margin: 10, marginTop: 17}}>
                            <Ionicons name="arrow-forward-circle-outline" 
                                size={25} 
                                color="orange"
                                marginTop={20}
                            />
                            </View>
                    </TouchableOpacity>
        }
        }
    );

    return (
        <ScrollView>
            <View style={{marginBottom: 10, paddingHorizontal: 20}}>
                <Text style={[Typography.h3, {textAlign: 'center'}]}>Från {stationName}</Text>
                <Text style={[Base.whiteText, {textAlign: 'center'}]}>Klicka på en försening för att se hur lång promenad du kan ta i väntan på att tåget ska avgå</Text>
            </View>
            <View style={[Base.main]}>
                {listOfDelays}
            </View>
        </ScrollView>
    );
};