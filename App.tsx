import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from "./components/Home";
import Pick from "./components/Pick";
import Deliveries from "./components/Deliveries";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { Base, Typography } from './styles';
import { useEffect, useState } from 'react';

import Auth from "./components/auth/Auth";
import Logout from "./components/auth/Logout";
import authModel from "./models/auth";

import Invoices from "./components/invoices/Invoices";


const Tab = createBottomTabNavigator();

const routeIcons = {
  "Lager": "home-outline",
  "Plock": "list",
  "Inleveranser": "car-outline",
  "Logga in": "lock-closed-outline",
  "Faktura": "cash-outline",
};

export default function App() {
    const [products, setProducts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
 
    useEffect(async () => {
        setIsLoggedIn(await authModel.loggedIn());
    }, []);

    return (
        <SafeAreaView style={Base.container}>
            <NavigationContainer>
                <Tab.Navigator screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName = routeIcons[route.name] || "alert";

                        return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: '#228DF8',
                        tabBarInactiveTintColor: 'grey',
                        headerShown: false
                        })}>
                        <Tab.Screen name="Lager">
                            {() => <Home products={products} setProducts={setProducts} />}
                        </Tab.Screen>
                        <Tab.Screen name="Plock">
                            {() => <Pick setProducts={setProducts} />}
                        </Tab.Screen>
                        <Tab.Screen name="Inleveranser" component={Deliveries}>
                        </Tab.Screen>
                        {isLoggedIn ? 
                            <Tab.Screen name="Faktura" component={Invoices} /> :
                            <Tab.Screen name="Logga in">
                                { () => <Auth setIsLoggedIn={setIsLoggedIn} /> }
                            </Tab.Screen>
                        }
                        {isLoggedIn ? 
                            <Tab.Screen name="Logga ut">
                            { () => <Logout setIsLoggedIn={setIsLoggedIn} /> }
                        </Tab.Screen> : null
                        }
                        
                </Tab.Navigator>
            </NavigationContainer>
        <StatusBar style="auto" />
        </SafeAreaView>
    );
}

