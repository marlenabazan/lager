import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ShipList from "./ShipList";
import ShipOrder from "./ShipOrder";

const Stack = createNativeStackNavigator();

export default function Ship() {
    return (
        <Stack.Navigator initialRouteName="List"
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="List" component={ShipList} />
            <Stack.Screen name="Order" component={ShipOrder} />
        </Stack.Navigator>
    );
};