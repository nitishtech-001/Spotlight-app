import { Stack , Slot} from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {ClerkProvider} from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import InitialLayout from "@/components/InitialLayout"

export default function RootLayout() {
  const publishKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if(!publishKey){
    throw new Error("Missing EXPO_CLERK_PUBLISHABLE_KEY in env")
  }  
  return (
    <ClerkProvider publishableKey={publishKey} tokenCache={tokenCache}>
      <SafeAreaProvider >
        <StatusBar backgroundColor="black" barStyle="light-content" />
        
          <SafeAreaView style={{flex:1,backgroundColor:"red"}}>
            <InitialLayout />
          </SafeAreaView>
      </SafeAreaProvider>
    </ClerkProvider>
     
  )
}
