import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { NavigationProps } from '../types'

export default function ButtonComponent() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetchData()
  })

  function fetchData() {
    console.log('fetchData')
  }

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <p>You clicked {count} times</p>
    </div>
  )
}
