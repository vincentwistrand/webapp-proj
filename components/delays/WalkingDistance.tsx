import { Text, View, StyleSheet } from "react-native";
import { Base, Typography } from "../../styles";
import MapView, { Circle } from 'react-native-maps';
import { Marker, Callout } from "react-native-maps";
import { Ionicons } from '@expo/vector-icons';


export default function WalkingDistance(route) {
    const stationName = route.route.params.stationName;
    const longitude = route.route.params.longitude;
    const latitude = route.route.params.latitude;
    const minutesLate = route.route.params.minutesLate;

    console.log(latitude);

    const walkingDistance = ((minutesLate - 1) * 100) / 2;

    return (
        <View style={Base.base}>
            <Text style={[Base.whiteText, {textAlign: 'center'}]}>Du hinner gå fram och tillbaka till cirkeln</Text>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude),
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}>
                    <Marker
                            coordinate={{ latitude: parseFloat(latitude), longitude: parseFloat(longitude) }}
                            >
                            <Ionicons name="train" 
                                size={25} 
                                color="red" 
                            />
                            <Callout>
                                    <View style={{height: 100, width:150 }}>
                                        <Text>{stationName}</Text>
                                        <Text style={Base.redText}>{minutesLate} min sen</Text>
                                        <Text>{stationName}</Text>
                                    </View>
                            </Callout>
                    </Marker>
                    <Circle
                        center={{ latitude: parseFloat(latitude), longitude: parseFloat(longitude) }}
                        radius={walkingDistance}>
                    </Circle>
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

