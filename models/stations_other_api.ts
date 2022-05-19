import config from "../config/config.json";
import Station from "../interface/station";
import fetch from 'react-native-digest-fetch';

const otherStationsModel = {
    getStations: async function getStations() {

    const response = await fetch('http://api.tagtider.net/v1/stations.json', {
    method: 'GET',
    headers: {
        'content-type': 'application/json'
    },
    username: 'tagtider',
    password: 'codemocracy',
    });

    const result = await response.json();
    //console.log(result.stations.station);
    return result.stations.station;
    }
};

export default otherStationsModel;