import { render, fireEvent } from '@testing-library/react-native';
import AuthFields from '../components/auth/AuthFields';


let auth = {};

const setAuth = (newAuth) => {
    auth = newAuth;
};

const mockSubmit = jest.fn();
const navigation = () => false; // dummy function


test('testning authfield for login', async () => {
    const title = "Logga in";
    const { getAllByText, getByTestId } = render(<AuthFields
        auth={auth}
        setAuth={setAuth}
        submit={mockSubmit}
        title={title}
        navigation={navigation}
        />);

        const titleElements = await getAllByText(title);

        expect(titleElements.length).toBe(2);


        const emailField = await getByTestId("email-field");
        const passwordField = await getByTestId("password-field");

        expect(emailField).toBeDefined();
        expect(passwordField).toBeDefined();


        const fakeEmail = "efo@bth.se";
        fireEvent.changeText(emailField, fakeEmail);

        expect(auth?.email).toEqual(fakeEmail);


        const fakePassword = "test1234";
        fireEvent.changeText(passwordField, fakePassword);

        expect(auth?.password).toEqual(fakePassword);
});