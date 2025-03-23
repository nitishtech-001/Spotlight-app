import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { authStyle } from "@/styles/auth.style";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={authStyle.container}>
      {/* Brand section */}
      <View style={authStyle.brandSection}>
        <View style={authStyle.logoContainer}>
          <Ionicons name="leaf" size={34} color={COLORS.primary} />
        </View>
        <Text style={authStyle.appName}>fakelight</Text>
        <Text style={authStyle.tagLine}>Hello why not working</Text>
        <Image
          style={authStyle.image}
          source={require("../../assets/images/auth-img-2.png")}
        />
      </View>
      <View style={authStyle.formSection}>
        <TextInput
          style={authStyle.input}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
        <TextInput
          style={authStyle.input}
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity onPress={onSignInPress} style={{
          width : 150,
          height  : 50,
          backgroundColor : "white"
        }}>
          <Text>Continue</Text>
        </TouchableOpacity>
        <View style={{ display: "flex", flexDirection: "row", gap: 3 }}>
          <Text style={authStyle.tagLine}>Don't have an account?</Text>
          <Link href="/signUp">
            <Text style={{color : "blue"}}>Sign up</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
