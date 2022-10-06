import { render } from '@testing-library/react-native';
import DeliveriesList from '../components/DeliveriesList';

const route = false;
const navigation  = () => false;

test('View should have a title, show message about empty list and a button to create new delivery', async () => {
    const { getByText } = render(<DeliveriesList route={route} navigation={navigation} />);

    const header = await getByText('Inleveranser');
    expect(header).toBeDefined();

    const emptyList = await getByText('Inleveranslistan är tom.', { exact: false });
    expect(emptyList).toBeDefined();

    const button = await getByText('Skapa ny inleverans');
    expect(button).toBeDefined();


//     const { getByText, debug } = render(<DeliveriesList route={route} navigation={navigation} />);

//     debug("DeliveriesList component");
});
