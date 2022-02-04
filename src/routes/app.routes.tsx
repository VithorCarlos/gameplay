import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '../global/styles/theme';
import { Home } from '../screens/Home';
import { AppointmentsDetails }  from '../screens/AppointmentsDetails';
import { AppointmentsCreate } from '../screens/AppointmentsCreate';


const {Navigator, Screen} = createNativeStackNavigator();
     

export function AppRoutes() {
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: theme.colors.secondary100 }
            }}
        > 
            <Screen
                name='Home'
                component={Home}
            />
            
            <Screen
                name='AppointmentsDetails'
                component={AppointmentsDetails}
            />

            <Screen
                name='AppointmentsCreate'
                component={AppointmentsCreate}
            />
        </Navigator>
    );
}
