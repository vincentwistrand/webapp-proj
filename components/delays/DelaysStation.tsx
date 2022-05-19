import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { Typography, Base } from '../../styles/index.js';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { textAlign } from '../../styles/Base.js';

export default function DelaysStation(route) {
    const stationName = route.route.params.stationName;
    const delays = route.route.params.delayInfo;
    const allStationNames = route.route.params.allStationNames;
    const navigation = useNavigation();

    const stationNamesNoDuplicates = [...new Map(allStationNames.map(item => [JSON.stringify(item), item])).values()];

    function ackronymToName (ackronym: string) {
        let name = "";
        stationNamesNoDuplicates.forEach(object => {
            if (object.ackronym === ackronym ) {
                //console.log(object.name)
                name = object.name;
            }
        });
        return name;
    }

    function timeFormat (date: string) {
        let newTime = date.substring(11, date.length -13)
        return newTime;
    }

    let counter = 1;
    const listOfDelays = delays
    .map((delay, index) => {
        if (delay.station.AdvertisedLocationName === stationName) {
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
    });

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