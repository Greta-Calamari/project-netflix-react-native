import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'
import Home from '../screen/Home'

import SearchedMoviesBox from '../components/SearchedMoviesBox'
import React from 'react'

import Play from '../screen/Play'
import Saved from '../screen/Saved'
import User from '../screen/User'
import SingleMovie from '../screen/SingleMovie'
import SingleTv from '../screen/SingleTv'
import SingleWatched from '../screen/SingleWatched'
import FavouriteBox from '../components/FavouriteBox'

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

      <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
      <Stack.Screen name="Play" component={Play} options={{ title: 'Player' }} />
      <Stack.Screen name="Saved" component={Saved} options={{ title: 'Saved' }} />
      <Stack.Screen name="User" component={User} options={{ title: 'User' }} />
      <Stack.Screen name="SingleMovie" component={SingleMovie} options={{ title: 'SingleMovie' }} />
      <Stack.Screen name="SingleTv" component={SingleTv} options={{ title: 'SingleTv' }} />
      <Stack.Screen name="SingleWatched" component={SingleWatched} options={{ title: 'SingleWatched' }} />
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
      <Tab.Screen name="Home" component={Home} />

      <Tab.Screen name="Favourites" component={FavouriteBox} options={{ title: 'FavouriteBox' }} />
      <Tab.Screen name="Search" component={SearchedMoviesBox} />
    </Tab.Navigator>
  )
}
