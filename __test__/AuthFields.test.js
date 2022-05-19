import { render } from '@testing-library/react-native';
import AuthFields from '../components/home/AuthFields';

//jest.mock("../components/inventory/StockList", () => "StockList");

let auth = {};
const setAuth = (newAuth) => {
    auth = newAuth;
}
const mockSubmit = jest.fn();
const navigation  = () => false;

test('testing authfield for login', async () => {
    const title = "Logga in";
    const { getAllByText, getByTestId, getAllByA11yLabel } = render(<AuthFields
        auth={auth}
        setAuth={setAuth}
        submit={mockSubmit}
        title={title}
        navigation={navigation}
    />);

    //debug("Stock component");

    const titleElements = await getAllByText(title);

    expect(titleElements.length).toBe(2);

    const emailField = await getByTestId("email-field");
    const passwordField = await getByTestId("password-field");

    expect(emailField).toBeDefined();
    expect(passwordField).toBeDefined();

    const a11yLabel = `${title} genom att trycka`
    const submitButton = getAllByA11yLabel(a11yLabel);

    expect(submitButton).toBeDefined();
});