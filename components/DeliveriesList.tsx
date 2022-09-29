import { useState, useEffect } from 'react';
import { ScrollView, Text, Button } from "react-native";
import { Base, Typography } from "../styles";

import deliveryModel from "../models/deliveries";
import delivery from '../models/deliveries';

export default function DeliveriesList({ route, navigation }){
    const { reload } = route.params || false;
    const [allDeliveries, setAllDeliveries] = useState([]);

    if (reload) {
        reloadDeliveries();
    }

    async function reloadDeliveries() {
        setAllDeliveries(await deliveryModel.getDeliveries())
    }

    useEffect(() => {
        reloadDeliveries();
    }, []);

    const listOfDeliveries = allDeliveries.map((delivery, index) => {
        return (<ScrollView style={{ ...Base.deliveryBox }} key={index}>
                <Text style = {Typography.header3}>{delivery.product_name}</Text>
                <Text style = {Typography.normal}>{delivery.amount}</Text>
                <Text style = {Typography.normal}>{delivery.delivery_date}</Text>
                <Text style = {Typography.normal}>{delivery.comment}</Text>
            </ScrollView>
        )
    });

    function deliveryListToPrint() {
        // console.log(listOfDeliveries.length)
        if(listOfDeliveries.length > 0)
            return listOfDeliveries
        return <Text style = {Typography.header2}>Inleveranslistan är tom.
        </Text>
    }

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>Inleveranser</Text>

                {/* {listOfDeliveries} */}
                {deliveryListToPrint()}
                
            <Button style={Base.button}
                title="Skapa ny inleverans"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
        </ScrollView>
    );
};

