
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { ConvexProviderWithClerk} from "convex/react-clerk";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ConvexReactClient } from "convex/react";

export default function ClerkAndConvexProvider({children} : {children:React.ReactNode}) {
	const publishKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
	const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!,{
	unsavedChangesWarning: false,
	});
	
	if(!publishKey){
	throw new Error("Missing EXPO_CLERK_PUBLISHABLE_KEY in env")
	}  
  return (
	<ClerkProvider publishableKey={publishKey} tokenCache={tokenCache}>
		  <ConvexProviderWithClerk client={convex} useAuth={useAuth} >
			<ClerkLoaded>
				{children}
			</ClerkLoaded>
		  </ConvexProviderWithClerk>
	</ClerkProvider>
  )
}