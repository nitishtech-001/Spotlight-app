import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'


export default function Profile() {
  return (
	<View>
	  <Text>profile screen</Text>
	  <Link href="../(auth)/sinUp" >Go to Sign up page</Link>
	</View>
  )
}