import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function Profile() {
	const {signOut} = useAuth();
	const handleSignout = async ()=>{
		await signOut();
		alert("User Signout Succesfully!");
	}
  return (
	<View>
	  <Text>profile screen</Text>
	  <Link href="/(auth)/login" >Go to Sign up page</Link>
	  <Text onPress={handleSignout}>Sign out</Text>
	</View>
  )
}