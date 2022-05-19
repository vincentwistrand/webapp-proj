import config from "../config/config.json";
import Station from "../interface/station";
import fetch from 'react-native-digest-fetch';

const arrivalsModel = {
    getArrivals: async function getArrivals(id: string) {
    
    const url = 'http://api.tagtider.net/v1/stations/' + id + '/transfers/arrivals.json';

    const response = await fetch(url, {
    method: 'GET',
    headers: {
        'content-type': 'application/json'
    },
    username: 'tagtider',
    password: 'codemocracy',
    });

    const result = await response.json();
    //console.log(result);
    return result;
    }
};

export default arrivalsModel;