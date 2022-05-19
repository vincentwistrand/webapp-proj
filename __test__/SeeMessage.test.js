import { render } from '@testing-library/react-native';
import SeeMessage from '../components/home/SeeMessage';

const route = {
    params: {
        message: {
            Header: 'Banfel',
            ExternalDescription: 'Stort banfel',
        }
    }
};

test('should display message', async () => {
    const { getByText, debug } = render(<SeeMessage
        route={route}
    />);

    //debug("Stock component");

    const header = await getByText('Banfel');
    const description = await getByText('Stort banfel');

    expect(header).toBeDefined();
    expect(description).toBeDefined();
});