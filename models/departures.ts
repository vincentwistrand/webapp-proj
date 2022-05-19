import config from "../config/config.json";
import Station from "../interface/station";
import fetch from 'react-native-digest-fetch';

const departuresModel = {
    getDepartures: async function getDepartures(id: string) {

    const url = 'http://api.tagtider.net/v1/stations/' + id + '/transfers/departures.json';

    const response = await fetch(url, {
    method: 'GET',
    headers: {
        'content-type': 'application/json'
    },
    username: 'tagtider',
    password: 'codemocracy',
    });

    const result = await response.json();

    return result;
    }
};

export default departuresModel;