import { StatusBar } from 'expo-status-bar'
import React from 'react'
import Navigation from './navigation'

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

export default function App() {
  return (
    <>
      <Navigation />
      <StatusBar style="auto" />
    </>
  )
}
