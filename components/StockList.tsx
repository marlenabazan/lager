import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

import { Base, Typography } from '../styles';

import productModel from "../models/products.ts";


export default function StockList({products, setProducts}) {
    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);
 
    // const [products, setProducts] = useState([]);
    //
    // useEffect(() => {
    //     fetch(`${config.base_url}/products?api_key=${config.api_key}`)
    //       .then(response => response.json())
    //       .then(result => setProducts(result.data));
    //     }, []);
    //
    // const list = products.map((product, index) => <Text key={index} style={Base.normal}>{ product.name } - { product.stock } st.</Text>);

    const list = products.map((product, index) => {
        return <Text
            key={index}
            style={Typography.normal}
            >
                { product.name } - { product.stock } st.
            </Text>
    });

    return (
        <View style={Typography.container}>
          {list}
        </View>
    );
}