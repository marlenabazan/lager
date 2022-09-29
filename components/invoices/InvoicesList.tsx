import { DataTable } from "react-native-paper";
import { ScrollView, Text } from "react-native";

import invoiceModel from "../../models/invoices";
import authModel from "../../models/auth";

import { Base, Typography } from "../../styles";
import storage from "../../models/storage";
import { useState, useEffect } from "react";
import { Button } from "react-native";

export default function InvoicesList({ route, navigation, setIsLoggedIn }) {  
    const { reload } = route.params || false;
    const [allInvoices, setAllInvoices] = useState([]);

    async function reloadInvoices() {
        setAllInvoices(await invoiceModel.getInvoices());
    }

    if (reload) {
        reloadInvoices();
    }

    useEffect(() => {
        reloadInvoices();
    }, []);

    // async function logOut() {
    //     storage.deleteToken();
    //     setIsLoggedIn(false);
    // }

    const invoicesRows = allInvoices.map((invoice, index) => {
        return (
        <DataTable.Row key={index}>
            <DataTable.Cell>{invoice.name}</DataTable.Cell>
            <DataTable.Cell numeric>{invoice.total_price}</DataTable.Cell>
            <DataTable.Cell numeric>{invoice.due_date}</DataTable.Cell>
        </DataTable.Row>);
    });

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>Fakturor</Text>
            
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Namn</DataTable.Title>
                    <DataTable.Title numeric>Pris</DataTable.Title>
                    <DataTable.Title numeric>Förfallodatum</DataTable.Title>
                </DataTable.Header>
                {invoicesRows}
            </DataTable>

            <Button
                title="Skapa ny faktura"
                onPress={() => {
                    navigation.navigate("Form");
                }}
            />
        </ScrollView>
    )
}