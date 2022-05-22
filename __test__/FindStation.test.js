import { render } from '@testing-library/react-native';
import FindStation from '../components/stations/FindStation';

const station = [
    {
        code: "000",
        id: "57",
        lat: "43",
        lng: "23",
        name: "Göteborg",
        slug: "G",
    },
    {
        code: "000",
        id: "57",
        lat: "43",
        lng: "23",
        name: "Helsingborg",
        slug: "Hb",
    }
];


test('Favorites list should contain station names', async () => {
    const { getByText } = render(<FindStation test={station}/>);

    const goteborg = await getByText('Göteborg', { exact: false });
    const helsingborg = await getByText('Helsingborg', { exact: false });

    expect(helsingborg).toBeDefined();
    expect(goteborg).toBeDefined();
});