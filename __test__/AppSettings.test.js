import { render } from '@testing-library/react-native';
import AppSettings from '../components/home/AppSettings';



const products =  
        [
            { name: "Shampoo", stock: 2 },
            { name: "Balsam", stock: 3 },
            { name: "Tvål", stock: 15 },
        ];

test('List should contain three items', async () => {
    const { getByText } = render(<AppSettings/>);

    const shampoo = await getByText('Shampoo', { exact: false });
    const balsam = await getByText('Balsam', { exact: false });
    const soap = await getByText('Tvål', { exact: false });

    expect(shampoo).toBeDefined();
    expect(balsam).toBeDefined();
    expect(soap).toBeDefined();
});