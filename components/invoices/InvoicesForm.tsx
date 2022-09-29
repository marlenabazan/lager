import { useState, useEffect } from "react";
import { Platform, ScrollView, Text, TextInput, Button, View } from "react-native";
import { Base, Typography, Forms } from "../../styles";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import invoicesModel from "../../models/invoices";
import ordersModel from "../../models/orders";

import Invoice from "../../interfaces/invoice";
import Order from "../../interfaces/order";


function zeroPad(number: number): string {
    if (number < 10) {
        return "0" + number;
    }
    return "" + number;
}

function formatDate(date: Date): string {
    return `${date.getFullYear()}-${zeroPad(date.getMonth()+1)}-${zeroPad(date.getDate())}`;
}

function OrderDropDown(props) {  
    const [orders, setOrders] = useState<Order[]>([]);
    
    useEffect(async () => {
        setOrders(await ordersModel.getOrders());
    }, []);
   
    const orderList = orders.filter(order => order.status_id < 600).map((order, index) => {
        return (
            <Picker.Item key={index} label={order.name} value={order.id} />
        )
    });

    return (
        <Picker
            selectedValue={props.invoice?.order_id}
            onValueChange={(itemValue) => {
                 props.setInvoice({ ...props.invoice, order_id: itemValue });
            }}>
            {orderList}
        </Picker>
    )
}

function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);  

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        props.setInvoice({
                            ...props.invoice,                           
                            creation_date: formatDate(date),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}

export default function InvoicesForm({navigation, setProducts}) {
    const [invoice, setInvoice] = useState<Partial<Invoice>>({});

    async function createInvoice() {
        await invoicesModel.createInvoice(invoice);

        navigation.navigate("List", { reload: true });
    }
    
    return (
        <ScrollView style={{ ...Base.base }}>
            <Text style={{ ...Typography.header2 }}>Ny faktura</Text>

            <Text style={{ ...Typography.label }}>Order</Text>
            <OrderDropDown 
                invoice={invoice}
                setInvoice={setInvoice}
            />

            <Text style={{ ...Typography.label}}>Faktura datum</Text>
            
            <DateDropDown
                invoice={invoice}                
                setInvoice={setInvoice}
            />

            <Button
                title="Skapa faktura"
                onPress={() => {
                    createInvoice();
                }}
            />
        </ScrollView>
    );
};
