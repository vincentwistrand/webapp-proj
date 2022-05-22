import { TouchableOpacity, Text, View, ScrollView, SafeAreaView, SwitchComponent } from 'react-native';
import { Typography, Base } from '../../styles/index.js';
import React, { useEffect, useState } from 'react';
import arrivalsModel from '../../models/arrivals';
import departuresModel from '../../models/departures';
import Arrival from '../../interface/arrivals';
import { DataTable } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';
import Departure from '../../interface/departures.js';
import { whiteText } from '../../styles/Base.js';

export default function StationInfo({route, navigation}) {
    const { station } = route.params.station;
    const [selectedTab, setSelectedTab] = useState<String>('departures');
    const [arrivals, setArrivals] = useState<Array<Arrival>>([]);
    const [departures, setDepartures] = useState<Array<Departure>>([]);
    const [dataExists, setDataExists] = useState <boolean> (true);

    async function reloadTrains() {
        if (route.params.tab) {
            setArrivals(route.params.arrivals);
            setDepartures(route.params.departures);
            setSelectedTab(route.params.tab);
        } else {
            const arrivalsObject = await arrivalsModel.getArrivals(station.id)
            const departuresObject = await departuresModel.getDepartures(station.id);
    
            if (arrivalsObject.station != null && Object.keys(arrivalsObject.station).length === 7) {
                setArrivals(arrivalsObject.station.transfers.transfer);
            } else {
                setDataExists(false);
            }
    
            if (arrivalsObject.station != null && Object.keys(arrivalsObject.station).length === 7) {
                setDepartures(departuresObject.station.transfers.transfer);
            } else {
                setDataExists(false);
            }
        }
    }

    useEffect(() => {
        reloadTrains();
        
    }, []);

    function SelectedTab() {
        switch(selectedTab) {
            case 'arrivals':
                return mapArrivals(arrivals);
            case 'departures':
                return mapDepartures(departures);
        }
    }

    return (
        <SafeAreaView>
            <View style={Base.stationsMain}>
                <View style={Base.titleSearchIcon}>
                    <Text></Text>
                    <Text style={Typography.stationTitle}>{station.name}</Text>
                    <TouchableOpacity style={{marginTop: 4}} onPress={() => navigation.navigate("Sök station")}>
                        <Ionicons name="search-outline" 
                                    size={25} 
                                    color="orange" 
                        />
                    </TouchableOpacity>
                </View>

                <View style={Base.arrDepButtonsRow}>

                    <TouchableOpacity
                        onPress={() => setSelectedTab('departures')}
                        style={[
                            selectedTab === 'departures' ? Base.arrDepButtonSelected: Base.arrDepButton
                        ]}>
                        <View style={{alignItems: 'center'}}><Text
                            style={
                                selectedTab === 'departures' ? Base.arrDepButtonSelectedLabel: Base.arrDepButtonLabel
                            }
                        >Avgångar</Text></View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setSelectedTab('arrivals')}
                        style={
                            selectedTab === 'arrivals' ? Base.arrDepButtonSelected: Base.arrDepButton
                        }>
                            <View style={{alignItems: 'center'}}><Text
                                style={
                                    selectedTab === 'arrivals' ? Base.arrDepButtonSelectedLabel: Base.arrDepButtonLabel
                                }
                                >Ankomster</Text></View>
                    </TouchableOpacity>
                
                </View>
                <ScrollView>
                    {!dataExists ? <Text style={[Typography.h3, {textAlign: 'center', marginTop: 50}]}>No data</Text>:SelectedTab()}
                </ScrollView>
               
            </View>
        </SafeAreaView>
    );
};

function mapArrivals(arrivals: Array<Arrival>) {
    let listOfArrivals = null;
    let counter = 1;

    listOfArrivals = arrivals
        .map((arrival: any, index: number) => {
            const originsList = arrival.origin.split(",");
            let startOrigin = originsList[0];
            if (startOrigin === "") {
                startOrigin = originsList[1];
            };
            let newArrival = "";
            if (arrival.newArrivel != null) {
                newArrival = arrival.newArrivel;
            }
            let color = 'black';
            if (counter % 2) {
            color = '#232323';
            }
            counter += 1;

            return <DataTable.Row key={index}>
                    <View style={{ flex: 6, backgroundColor: color }}>
                        <Text style={{ color: "#fff", fontSize: 15, marginTop: 15, marginLeft: 10 }}>{arrival.arrival.substring(11, 16)}</Text>
                    </View>
                    <View style={{ flex: 20, backgroundColor: color, paddingLeft: 10 }}>
                        <Text style={{ color: "#fff", fontSize: 18, marginTop: 5 }}>{startOrigin}</Text>
                        <Text style={{ color: "white" }}>{arrival.type}</Text>
                        <Text style={{ color: "red", marginBottom: 3 }}>{arrival.comment}</Text>
                    </View>
                    <DataTable.Cell style={{ flex: 8, backgroundColor: color }}><Text style={{ color: "#fff"}}>{arrival.track}</Text></DataTable.Cell>
                    <DataTable.Cell style={{ flex: 5, backgroundColor: color }}><Text style={{ color: "#fff"}}>{arrival.train}</Text></DataTable.Cell>
                </DataTable.Row>
    });

    return <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={{ flex: 6, marginLeft: 10 }}><Text style={{ color: "grey" }}>Tid</Text></DataTable.Title>
                    <DataTable.Title style={{ flex: 20, marginRight: 115 }} numeric><Text style={{ color: "grey" }}>Startstation</Text></DataTable.Title>
                    <DataTable.Title style={{ flex: 8, marginRight: 60 }} numeric><Text style={{ color: "grey" }}>Spår</Text></DataTable.Title>
                    <DataTable.Title style={{ flex: 5, marginRight: 30 }} numeric><Text style={{ color: "grey" }}>Tåg</Text></DataTable.Title>
                </DataTable.Header>
                {listOfArrivals}
            </DataTable>

}

function mapDepartures(departures: Array<Departure>) {
    let listOfDepartures = null;
    let counter = 1;

    listOfDepartures = departures
        .map((departure: any, index: number) => {
            const destinationList = departure.destination.split(",");
            let lastDestination = destinationList[0];
            if (lastDestination === "") {
                lastDestination = destinationList[1];
            };

            let color = 'black';
            if (counter % 2) {
            color = '#232323';
            }
            counter += 1;

            return <DataTable.Row key={index}>
                    <View style={{ flex: 6, backgroundColor: color }}>
                        <Text style={{ color: "#fff", fontSize: 15, marginTop: 15, marginLeft: 10 }}>{departure.departure.substring(11, 16)}</Text>
                    </View>
                    <View style={{ flex: 20, backgroundColor: color, paddingLeft: 10 }}>
                        <Text style={{ color: "#fff", fontSize: 18, marginTop: 5 }}>{lastDestination}</Text>
                        <Text style={{ color: "white" }}>{departure.type}</Text>
                        <Text style={{ color: "red", marginBottom: 3 }}>{departure.comment}</Text>
                    </View>
                    <DataTable.Cell style={{ flex: 8, backgroundColor: color }}><Text style={{ color: "#fff"}}>{departure.track}</Text></DataTable.Cell>
                    <DataTable.Cell style={{ flex: 5, backgroundColor: color }}><Text style={{ color: "#fff"}}>{departure.train}</Text></DataTable.Cell>
                </DataTable.Row>
    });

    return <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={{ flex: 6, marginLeft: 10 }}><Text style={{ color: "grey" }}>Tid</Text></DataTable.Title>
                    <DataTable.Title style={{ flex: 20, marginRight: 115 }} numeric><Text style={{ color: "grey" }}>Destination</Text></DataTable.Title>
                    <DataTable.Title style={{ flex: 8, marginRight: 60 }} numeric><Text style={{ color: "grey" }}>Spår</Text></DataTable.Title>
                    <DataTable.Title style={{ flex: 5, marginRight: 30 }} numeric><Text style={{ color: "grey" }}>Tåg</Text></DataTable.Title>
                </DataTable.Header>
                {listOfDepartures}
            </DataTable>

}

function noDataAvailable() {
    return <View style={{alignItems: "center", paddingTop: 200 }}><Text style={Typography.h3}>Ingen data tillgänglig</Text></View>
}