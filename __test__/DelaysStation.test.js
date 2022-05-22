import { render } from '@testing-library/react-native';
import DelaysStation from '../components/delays/DelaysStation';
jest.useFakeTimers()

const route = {
    params: {
        stationName: 'Stockholm Central',
        delayInfo:     [
        {
            delay: {
              ActivityId: "1500adde-205d-5f7c-08da-2e26ca0716fd",
              ActivityType: "Avgang",
              AdvertisedTimeAtLocation: "2022-05-20T09:26:00.000+02:00",
              AdvertisedTrainIdent: "425",
              Canceled: false,
              EstimatedTimeAtLocation: "2022-05-20T09:45:00.000+02:00",
              FromLocation: [
                {
                  LocationName: "Cst",
                  Order: 0,
                  Priority: 1,
                },
              ],
              ToLocation: [
                {
                  LocationName: "G",
                  Order: 0,
                  Priority: 1,
                },
              ],
            },
            latitude: "59.329970842872264",
            longitude: "18.057267018575825",
            station: {
              AdvertisedLocationName: "Stockholm Central",
              Geometry: {
              WGS84: "POINT (18.057267018575825 59.329970842872264)",
              },
              LocationSignature: "Cst",
              PlatformLine: [
                "1",
                "2",
              ],
            }
        },
        {
            delay: {
              ActivityId: "1500adde-205d-5f7c-08da-2e26ca0716fd",
              ActivityType: "Avgang",
              AdvertisedTimeAtLocation: "2022-05-20T10:32:00.000+02:00",
              AdvertisedTrainIdent: "55",
              Canceled: false,
              EstimatedTimeAtLocation: "2022-05-20T10:42:00.000+02:00",
              FromLocation: [
                {
                  LocationName: "Cst",
                  Order: 0,
                  Priority: 1,
                },
              ],
              ToLocation: [
                {
                  LocationName: "Hb",
                  Order: 0,
                  Priority: 1,
                },
              ],
            },
            latitude: "59.329970842872264",
            longitude: "18.057267018575825",
            station: {
              AdvertisedLocationName: "Stockholm Central",
              Geometry: {
              WGS84: "POINT (18.057267018575825 59.329970842872264)",
              },
              LocationSignature: "Cst",
              PlatformLine: [
                "1",
                "2",
              ],
            }
        },
        ],
        allStationNames: [
            {
                ackronym: "G",
                name: "Göteborg C"
            },
            {
                ackronym: "Hb",
                name: "Helsingborg C"
            }
        ]
    }
};

test('should display all delays from a station (train, destination, departure station, minutes late)', async () => {
    const { getByText, queryByText, debug } = render(<DelaysStation
        route={route}
    />);

    //debug("DelaysStation component");

    const title = await queryByText('Stockholm Central');
    const trainOne = await queryByText('425');
    const trainTwo = await queryByText('55');
    const timeOne = await queryByText('19 min sent');
    const timeTwo = await queryByText('10 min sent');
    const destinationOne = await queryByText('Göteborg C');
    const destinationTwo = await queryByText('Helsingborg C');

    expect(title).toBeDefined();
    expect(trainOne).toBeDefined();
    expect(trainTwo).toBeDefined();
    expect(timeOne).toBeDefined();
    expect(timeTwo).toBeDefined();
    expect(destinationOne).toBeDefined();
    expect(destinationTwo).toBeDefined();
});