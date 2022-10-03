import { useEffect, useState, useRef } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Base, Typography } from "../../styles";
import { DataTable } from "react-native-paper";

import MapView from 'react-native-maps';
import * as Location from 'expo-location';

import { Marker } from "react-native-maps";

import getCoordinates from "../../models/nominatim";


export default function ShipOrder({ route }) {
    const {order} = route.params;
    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const map = useRef(null);

    useEffect(() => {
        (async () => {
            const results = await getCoordinates(`${order.address}, ${order.city}`);

            setMarker(<Marker
                identifier="there"
                coordinate={{ latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) }}
                title={results[0].display_name}
            />);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
    
            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});
    
            setLocationMarker(<Marker
                identifier="Min plats"
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />);
        })();
    }, []);

    async function fitMarkers() {
        await Location.getCurrentPositionAsync({});
        if (map?.current && marker) {          
            map.current.fitToSuppliedMarkers(["there", "Min plats"], true)
         }
    }

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Skicka order</Text>
            <View style={Base.details}>
                <Text style={Typography.normal}>{order.name}</Text>
                <Text style={Typography.normal}>{order.address}</Text>
                <Text style={Typography.normal}>{order.zip} {order.city}</Text>
                <Text style={Typography.normal}>{order.country}</Text>
            </View>
            <View style={styles.container}>
                <MapView
                    ref={map}
                    key={marker}
                    style={styles.map}
                    onMapReady={fitMarkers}
                    onMapLoaded={fitMarkers}
                    // initialRegion={{
                    //     latitude: 56.1612,
                    //     longitude: 15.5869,
                    //     latitudeDelta: 2.1,
                    //     longitudeDelta: 2.1,
                    // }}
                    >
                    {locationMarker}
                    {marker}
                </MapView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});