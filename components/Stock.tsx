import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
// import config from "../config/config.json";
import { Base, Typography } from '../styles';
import productModel from "../models/products.ts";


function StockList({products, setProducts}) {
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

export default function Stock({products, setProducts}) {
    return (
        <View>
          <Text style={Typography.header2}>Lagerförteckning</Text>
          <StockList products={products} setProducts={setProducts}/>
        </View>
    );
}
