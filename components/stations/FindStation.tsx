import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, TextInput, Text, TouchableOpacity, View } from 'react-native';
import StationOtherAPI from '../../interface/station_other_api';
import otherStationsModel from '../../models/stations_other_api';
import { Base, Forms } from '../../styles';

const Stack = createNativeStackNavigator();

export default function FindStations() {
    const [searchWord, setSearchWord] = useState<string>("");
    const [stations, setStations] = useState<Array<StationOtherAPI>>([]);
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            setStations(await otherStationsModel.getStations());
        })();
    }, []);

    const nonActiveStations = [""]

    const listOfStations = stations
    .filter((station) => {
        if (!nonActiveStations.includes(station.id)) {
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