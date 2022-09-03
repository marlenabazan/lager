// 4fa266c6d6a72576c94dd7a3e375c015

import { Image, StyleSheet, Text, ScrollView } from 'react-native';
import warehouse from './../assets/nut.png';
import Stock from './Stock.tsx';
import { Base, Typography } from '../styles';


export default function Home({ route, products, setProducts }) {

    return (
          <ScrollView style={Base.base}>
            <Text style={Typography.header1}>LAGER-APPEN</Text>
            <Image source={warehouse} style={Base.image} />
            <Stock products={products} setProducts={setProducts} />
          </ScrollView>
    );
}
