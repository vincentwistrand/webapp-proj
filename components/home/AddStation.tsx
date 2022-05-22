import React, { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Station from "../../interface/station";
import stationsModel from "../../models/stations";
import { Base, Forms } from "../../styles";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import authModel from "../../models/auth";
import storage from "../../models/storage";
import { showMessage } from "react-native-flash-message";

export default function addStation({test=null}) {
    const [searchWord, setSearchWord] = useState<string>("");
    const [stations, setStations] = useState<Array<Station>>([]);
    const navigation = useNavigation();

    async function getStations() {
        setStations(await stationsModel.getStations())
    };

    useEffect(() => {
        if (test) {
            setStations(test);
        } else {
            getStations();
        }
    }, [])

    async function addFavorite(station: Station) {
        const currentUser = await storage.readCurrentUser();
        const allUserData = await authModel.getUserData();

        let authorizedUser = {};
        let authorizedUserId = 0;

        allUserData.forEach(user => {
            if (user.email === currentUser.email) {
                authorizedUser = user;
                authorizedUserId = user.id;
            }
        });

        const stationSignature = station.LocationSignature;

        if (authorizedUserId === 0) {
            const artefactObjectToString = JSON.stringify({station: station.LocationSignature});
            await authModel.postUserData(artefactObjectToString);
            navigation.navigate('Mina sidor', {reload: true});
        } else {
            let artefactObject = JSON.parse(authorizedUser.artefact);

            let favoriteStationsList = artefactObject.station.split(",");

            if (favoriteStationsList.includes(stationSignature)) {
                showMessage({
                    message: "Finns redan",
                    description: "Stationen är redan tillagd i favoriter",
                    type: "warning"
                });
            } else {
                favoriteStationsList.push(stationSignature);
    
                let favoriteStationString = "";
                favoriteStationsList.forEach((station: string) => {
                    favoriteStationString += station + ",";
                });
        
                favoriteStationString = favoriteStationString.slice(0, -1);
        
                artefactObject.station = favoriteStationString;
        
                const newArtefact = JSON.stringify(artefactObject);
    
                await authModel.updateUserData(newArtefact, authorizedUserId);

                showMessage({
                    message: "Station Tillagd",
                    description: station.AdvertisedLocationName + " lades till i dina favoriter",
                    type: "success"
                });
    
                navigation.navigate('Mina sidor', {reload: true});
            }
        }
    }

    const listOfStations = stations
    .filter((station) => {
        if (searchWord === '') {
          return station;
        } else if (station.AdvertisedLocationName.toLowerCase().startsWith(searchWord.toLowerCase())) {
          return station;
        }
      })
    .map((station, index) => {
        return  <TouchableOpacity
                    style={Base.listButton}
                    key={index}
                    onPress={() => addFavorite(station)}
                    >
                    <Text style={Base.listTextButton}>{station.AdvertisedLocationName}</Text>
                </TouchableOpacity>
    });

    return (
        <ScrollView style={Base.mainPadding}>
            <View style={Forms.searchInput}>
                <View style={Forms.inputAndIcon}>
                    <Ionicons 
                        name="search" 
                        size={20} 
                        style={Forms.iconStyle}
                        color="grey" 
                    />
                    <TextInput placeholder="Search"  
                        style={Forms.inputStyle}
                        autoCorrect={false}
                        selectionColor={'orange'} 
                        placeholderTextColor={'grey'}
                        clearButtonMode='always'
                        onChangeText={event => setSearchWord(event)}/>
                </View>
                <TouchableOpacity style={Base.searchButton} onPress={() => navigation.navigate('Inställningar')}>
                    <Text style={Base.searchButtonText}>Avbryt</Text>
                </TouchableOpacity>
            </View>
            {listOfStations}
        </ScrollView>
    );
}