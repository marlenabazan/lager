// 4fa266c6d6a72576c94dd7a3e375c015

import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import warehouse from './assets/nut.png';
import Stock from './components/Stock.tsx';
import { useFonts, Roboto_900Black } from '@expo-google-fonts/roboto';


export default function App() {
    let [fontsLoaded] = useFonts({
        Roboto_900Black,
    });

    return (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.base}>
            <Text style={{ color: '#088015', fontSize: 42, padding: 24, textAlign: 'center', fontFamily: 'Roboto_900Black' }}>Lager-Appen</Text>
            <Image source={warehouse} style={{ width: 280, alignSelf: 'center' }} />
            <Stock />
            <StatusBar style="auto" />
          </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#4B4B4B',
    },
    base: {
        flex: 1,
        backgroundColor: '#fff',
        paddingLeft: 12,
        paddingRight: 12,

    }
});
