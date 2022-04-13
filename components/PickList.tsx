import { View, Text, Button } from "react-native";
import { Base, Typography } from '../styles';
import { useState, useEffect } from 'react';

import orderModel from "../models/orders.ts";
import productModel from "../models/products.ts";


export default function PickList({ route, navigation, setProducts }) {
    const { order } = route.params;

    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await productModel.getProducts());
        navigation.navigate("List", { reload: true });
    }

    const orderItemsList = order.order_items.map((item, index) => {
        return <Text style = {Typography.normal}
                key={index}
                >
                    {item.name} - {item.amount} - {item.location}
            </Text>;
    });

    const checkStock = order.order_items.map((item, index) => {
        if (item.amount < item.stock) {
            return <Button title="Plocka order" onPress={pick} />
        } else {
            return <Text style={Typography.header2}>För få {item.name} i lager ({item.stock}).</Text>
        }
    });

    return (
        <View>
            <Text style = {Typography.normal}>{order.name}</Text>
            <Text style = {Typography.normal}>{order.address}</Text>
            <Text style = {Typography.normal}>{order.zip} {order.city}</Text>

            <Text style = {Typography.header3}>Produkter:</Text>

            {orderItemsList}
            {checkStock}

        </View>
    )
};
