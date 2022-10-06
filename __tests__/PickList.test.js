import { render } from '@testing-library/react-native';
import PickList from '../components/PickList';

const route =  {
    "params": {
        "order": {
            "id": 6275,
            "name": "Anders Andersson",
            "address": "Stortorget",
            "zip": "12345",
            "city": "Karlskrona",
            "country": "Sweden",
            "status": "Ny",
            "status_id": 100,
            "order_items": [],
        },
    },
};

const setProducts = () => false;
const navigation  = () => false;

it('Pick-view should contain customers name and full address', async () => {
    const { getByText } = render(<PickList route={route} navigation={navigation} setProducts={setProducts} />);
    const name = await getByText('Anders Andersson', { exact: false });
    const address = await getByText('Stortorget', { exact: false });
    const zip = await getByText('12345', { exact: false });
    const city = await getByText('Karlskrona', { exact: false });

    expect(name).toBeDefined();
    expect(address).toBeDefined();
    expect(zip).toBeDefined();
    expect(city).toBeDefined();

    // const { getByText, debug } = render(<PickList route={route} navigation={navigation} setProducts={setProducts} />);

    // debug("PickList component");
});