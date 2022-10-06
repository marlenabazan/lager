import { render } from '@testing-library/react-native';
import DeliveryForm from '../components/DeliveryForm';

const navigation  = () => false;

test('View should have a title, DropDownProducts, DropDownDate, amount and comment fields and a button to create delivery', async () => {
    const { getByText, getByTestId } = render(<DeliveryForm navigation={navigation} />);

    const header = await getByText('Ny inleverans');
    const productDropDown = await getByTestId("productDropDown");
    const dateDropDown = await getByTestId("dateDropDown");
    const amount = await getByTestId("amount");
    const comment = await getByTestId("comment");
    const create = await getByTestId("create");
    
    expect(header).toBeDefined();
    expect(productDropDown).toBeDefined();
    expect(dateDropDown).toBeDefined();
    expect(amount).toBeDefined();
    expect(comment).toBeDefined();
    expect(create).toBeDefined();

    // const { getByText, getByTestId, debug } = render(<DeliveryForm navigation={navigation} />);

    // debug("DeliveryForm component");
});
