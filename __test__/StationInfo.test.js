import { render } from '@testing-library/react-native';
import StationInfo from '../components/stations/StationInfo';
jest.useFakeTimers()

const routeDepartures = {
    params: {
        station: {
            station: {
                name: 'Arlanda',
            }
        },
        tab: 'departures',
        arrivals: [
            {
                arrival: "2022-05-20 08:33:00",
                comment: null,
                detected: "2022-05-19 18:40:01",
                id: "23052183",
                newArrival: null,
                origin: "Falun,Borlänge,Avesta,Krylbo",
                track: "2",
                train: "51",
                type: "SJ Snabbtåg",      
            }
        ],
        departures: [
            {
                comment: null,
                departure: "2022-05-20 09:29:00",
                destination: "Stockholm,C,Södertälje,S,Strängnäs,Eskilstuna,Arboga",
                detected: "2022-05-19 19:30:02",
                id: "23052548",
                newDeparture: null,
                track: "2",
                train: "925",
                type: "Mälartåg",
                updated: "2022-05-19 21:25:01",
              }
        ],
    }
};

test('should display departures (tid, destination, spår, tåg)', async () => {
    const { getByText, debug } = render(<StationInfo
        route={routeDepartures}
    />);

    //debug("Stock component");

    const title = await getByText('Arlanda');
    const stockholm = await getByText('Stockholm');
    const Time = await getByText('09:29');
    const train = await getByText('925');
    const trainType = await getByText('Mälartåg');

    expect(title).toBeDefined();
    expect(stockholm).toBeDefined();
    expect(Time).toBeDefined();
    expect(train).toBeDefined();
    expect(trainType).toBeDefined();
});

const routeArrivals = {
    params: {
        station: {
            station: {
                name: 'Arlanda',
            }
        },
        tab: 'arrivals',
        arrivals: [
            {
                arrival: "2022-05-20 08:33:00",
                comment: null,
                detected: "2022-05-19 18:40:01",
                id: "23052183",
                newArrival: null,
                origin: "Falun,Borlänge,Avesta,Krylbo",
                track: "2",
                train: "51",
                type: "SJ Snabbtåg",      
            }
        ],
        departures: [
            {
                comment: null,
                departure: "2022-05-20 09:29:00",
                destination: "Stockholm,C,Södertälje,S,Strängnäs,Eskilstuna,Arboga",
                detected: "2022-05-19 19:30:02",
                id: "23052548",
                newDeparture: null,
                track: "2",
                train: "925",
                type: "Mälartåg",
                updated: "2022-05-19 21:25:01",
              }
        ],
    }
};

test('should display arrivals (tid, destination, spår, tåg)', async () => {
    const { getByText, debug } = render(<StationInfo
        route={routeArrivals}
    />);

    //debug("Stock component");

    const title = await getByText('Arlanda');
    const falun = await getByText('Falun');
    const time = await getByText('08:33');
    const train = await getByText('51');
    const trainType = await getByText('SJ Snabbtåg');

    expect(title).toBeDefined();
    expect(falun).toBeDefined();
    expect(time).toBeDefined();
    expect(train).toBeDefined();
    expect(trainType).toBeDefined();
});