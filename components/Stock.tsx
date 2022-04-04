import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import config from "../config/config.json";
import { useFonts, Roboto_400Regular, Roboto_300Light } from '@expo-google-fonts/roboto';


function StockList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${config.base_url}/products?api_key=${config.api_key}`)
          .then(response => response.json())
          .then(result => setProducts(result.data));
        }, []);

    const list = products.map((product, index) => <Text key={index} style={{ fontSize: 16, fontFamily: 'Roboto_300Light', lineHeight: 20 }}>{ product.name } - { product.stock } st.</Text>);

    return (
        <View style={styles.container}>
          {list}
        </View>
    );
}

export default function Stock() {
    return (
        <View>
          <Text style={{color: '#333', fontSize: 24, padding: 24, paddingBottom: 0, fontFamily: 'Roboto_900Black', lineHeight: 32 }}>Lagerförteckning</Text>
          <StockList/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        color: '#333',
        padding: 24,
    }
});
