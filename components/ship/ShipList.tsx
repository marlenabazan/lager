import { View, Text, Button } from "react-native";

export default function ShipList({ navigation }) {

    return (
        <View>
            <Text>Ordrar redo att skickas</Text>
            <Button
                title="En fejk order"
                key="0"
                onPress={() => {
                    navigation.navigate("Order", {
                        order: {
                            "id": 1,
                            "name": "Anders Andersson",
                            "address": "Stortorget",
                            "zip": "12345",
                            "city": "Karlskrona",
                            "country": "Sweden",
                            "status": "Packad",
                            "status_id": 200,
                        }
                    });
                }}
            />
        </View>
    )
}