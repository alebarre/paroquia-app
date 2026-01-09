import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/home/HomeScreen';
import EventsScreen from '../screens/events/EventScreen';
import RafflesScreen from '../screens/raffles/RafflesScreen';
import TithesScreen from '../screens/tithes/TithesScreen';
import DonationsScreen from '../screens/donations/DonationsScreen';
import PrayerRequestScreen from '../screens/prayers/PrayerRequestScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
  screenOptions={({ route }) => ({
    headerShown: false,
    tabBarStyle: {
      height: 90,
      backgroundColor: '#2c3e50ff',
      borderTopColor: '#1a252fff',
    },
    tabBarLabelStyle: {
      fontSize: 10,
    },
    tabBarActiveTintColor: '#d8dfe9ff',
    tabBarInactiveTintColor: '#7694bbff',
    tabBarIcon: ({ color, size }) => {
      let iconName: string;

      switch (route.name) {
        case 'Início':
          iconName = 'home-outline';
          break;
        case 'Eventos':
          iconName = 'calendar-outline';
          break;
        case 'Rifas':
          iconName = 'gift-outline';
          break;
        case 'Dízimos':
          iconName = 'cash-outline';
          break;
        case 'Doações':
          iconName = 'heart-outline';
          break;
        case 'Oração':
          iconName = 'hand-left-outline';
          break;
        case 'Perfil':
          iconName = 'person-outline';
          break;
        default:
          iconName = 'ellipse-outline';
      }

      return <Ionicons name={iconName as any} size={20} color={color} />;
    },
  })}
>
  <Tab.Screen name="Início" component={HomeScreen} />
  <Tab.Screen name="Eventos" component={EventsScreen} />
  <Tab.Screen name="Rifas" component={RafflesScreen} />
  <Tab.Screen name="Dízimos" component={TithesScreen} />
  <Tab.Screen name="Doações" component={DonationsScreen} />
  <Tab.Screen name="Oração" component={PrayerRequestScreen} />
  <Tab.Screen name="Perfil" component={ProfileScreen} />
</Tab.Navigator>
  );
}