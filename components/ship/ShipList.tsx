import { View, Text, Button } from "react-native";
import { useState, useEffect } from "react";

import { Base, Typography } from "../../styles";
import orderModel from "../../models/orders";


export default function ShipList({ navigation, route }) {
    const { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState([]);

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    }

    if (reload) {
        reloadOrders();
    }

    useEffect(() => {
        reloadOrders();
    }, []);

    // console.log(allOrders);

    const orderList = allOrders.filter(order => order.status === "Packad").map((order, index) => {
            return (
            <Button
                title={order.name}
                key={index}
                onPress={() => {
                    console.log(order);
                }}
            />)
        });

    return (
        <View>
            <Text style={Typography.header2}>Ordrar redo att skickas</Text>
            {orderList}
        </View>
    );
}