import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'

import SearchedMoviesBox from '../components/SearchedMoviesBox'
import React from 'react'

import FavouriteBox from '../components/FavouriteBox'
import HomeScreen from '../screen/HomeScreen'
import PlayScreen from '../screen/PlayScreen'
import SavedScreen from '../screen/SavedScreen'
import SingleMovieScreen from '../screen/SingleMovieScreen'
import UserScreen from '../screen/UserScreen'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stacked />
    </NavigationContainer>
  )
}
function Stacked() {
  return (
    <Stack.Navigator
      initialRouteName="Tab"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BottomTab" component={BottomTabNav} options={{ title: 'BottomTab' }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="Play" component={PlayScreen} options={{ title: 'Player' }} />
      <Stack.Screen name="Saved" component={SavedScreen} options={{ title: 'Saved' }} />
      <Stack.Screen name="User" component={UserScreen} options={{ title: 'User' }} />
      <Stack.Screen name="SingleMovie" component={SingleMovieScreen} options={{ title: 'SingleMovie' }} />
    </Stack.Navigator>
  )
}

function BottomTabNav() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home-sharp' : 'ios-home-outline'
          } else if (route.name === 'Favourites') {
            iconName = focused ? 'ios-heart-sharp' : 'ios-heart-outline'
          } else if (route.name === 'Search') {
            iconName = focused ? 'search-outline' : 'search-outline'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#DA1A37',
        tabBarInactiveTintColor: 'gray',

        tabBarStyle: {
          paddingVertical: 5,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          backgroundColor: 'white',
          position: 'absolute',
          height: 80,
        },
        tabBarLabelStyle: { paddingBottom: 3 },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favourites" component={FavouriteBox} options={{ title: 'FavouriteBox' }} />
      <Tab.Screen name="Search" component={SearchedMoviesBox} />
    </Tab.Navigator>
  )
}
