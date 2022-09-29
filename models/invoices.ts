import config from "../config/config.json";

import Invoice from "../interfaces/invoice";

import storage from "./storage";
import orderModel from "./orders";


const invoice = {
    getInvoices: async function getInvoices(): Promise<Invoice[]> {
        const tokenObject: any = await storage.readToken();        
        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            headers: {
                'x-access-token': tokenObject.token
            },
        });

        const result = await response.json();
        return result.data;
    },

    createInvoice: async function createInvoice(invoiceObject: Partial<Invoice>) {
        let order = await orderModel.getOrder(invoiceObject);
        // console.log(invoiceObject);
        
        // console.log(order);
        
        let updateData = {
            id: order.id,
            name: order.name,
            status_id: 600,
            api_key: config.api_key,
        }

        orderModel.updateOrder(updateData);

        let totalPrice = order.order_items.reduce((price, item) => {
            return price + item.amount * item.price;
        }, 0);

        if (invoiceObject.creation_date == undefined) {
            invoiceObject.creation_date = new Date()
        }
        
        let dueDate = new Date(invoiceObject.creation_date);
        dueDate.setDate(dueDate.getDate() + 30);

        invoiceObject.due_date  = dueDate.toLocaleDateString('se-SV')
        invoiceObject.total_price = totalPrice;
        invoiceObject.api_key = config.api_key;

        const tokenObject: any = await storage.readToken();
        const response = await fetch(`${config.base_url}/invoices`,  {
            body: JSON.stringify(invoiceObject),
            headers: {
                'content-type': 'application/json',
                'x-access-token': tokenObject.token
            },
            method: 'POST'
        });
    }
}

export default invoice;