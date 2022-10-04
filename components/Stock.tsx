
import { Text, View, StyleSheet } from 'react-native';
// import config from "../config/config.json";
import { Base, Typography } from '../styles';

import StockList from './StockList';


export default function Stock({products, setProducts}) {
    return (
        <View>
          <Text style={Typography.header2}>Lagerförteckning</Text>
          <StockList products={products} setProducts={setProducts}/>
        </View>
    );
}
