import React from 'react';
import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Stack } from 'expo-router';

export default function AuthRoutesLayout() {
	const {isSignedIn} =  useAuth();
	if(isSignedIn){
		<Redirect href="/" />
	}
  return (
	<Stack screenOptions={{
		headerTitleAlign : "center",
		headerTintColor : "white",
		headerStyle : {
			backgroundColor : "black",
		},
		headerTitleStyle : {
			fontSize : 30,
			fontWeight : "semibold",
		}
	}}>
		<Stack.Screen name="login" options={{
			title : "Login"
		}}     />
		
		<Stack.Screen name="signUp" options={{
			title : "Sign Up"
		}}     />
		</Stack>
  )
}