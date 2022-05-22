import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, TextInput, Text, TouchableOpacity, View } from 'react-native';
import StationOtherAPI from '../../interface/station_other_api';
import otherStationsModel from '../../models/stations_other_api';
import { Base, Forms } from '../../styles';

export default function FindStations({test=null, navigation}) {
    const [searchWord, setSearchWord] = useState<string>("");
    const [stations, setStations] = useState<Array<StationOtherAPI>>([]);

    useEffect(() => {
        (async () => {
            if (test) {
                setStations(test);
            } else {
                setStations(await otherStationsModel.getStations());
            }
        })();
    }, []);

    const stationsWithData = ["4","9","17","26","47","49","51","57","58","81","82",
                            "86","89","101","107","108","117","119","121","122",
                            "124","139","162","168","169","174","200","201","203",
                            "205","218","226","229","235","243","248","255","273",
                            "286","290","297","314","315","333","338","341","343"];

    const listOfStations = stations
    .filter((station) => {
        if (stationsWithData.includes(station.id)) {
            if (searchWord === '') {
                return station;
              } else if (station.name.toLowerCase().startsWith(searchWord.toLowerCase())) {
                return station;
              }
        }
      })
    .map((station, index) => {
        return  <TouchableOpacity
                    style={Base.listButton}
                    key={index}
                    onPress={() => navigation.navigate('Station', {
                        station: {station}
                      })}>
                    <Text style={Base.listTextButton}>{station.name}</Text>
                </TouchableOpacity>
    });

    return (
        <ScrollView style={[Base.mainPadding, {marginTop: 30}]}>
            <View style={Forms.searchInput}>
                <View style={Forms.inputAndIcon}>
                    <Ionicons 
                        name="search-outline" 
                        size={20} 
                        style={Forms.iconStyle}
                        color="grey" 
                    />
                    <TextInput placeholder="Sök"  
                        style={Forms.inputStyle}
                        autoCorrect={false}
                        selectionColor={'orange'} 
                        placeholderTextColor={'grey'}
                        clearButtonMode='always'
                        onChangeText={event => setSearchWord(event)}/>
                </View>
            <TouchableOpacity style={Base.searchButton}>
                <Text style={Base.searchButtonText}>Avbryt</Text>
            </TouchableOpacity>
            </View>
            {listOfStations}
        </ScrollView>
    );
};