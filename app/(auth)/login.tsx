import { useSignIn, useSSO } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import React,{useState} from "react";
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { authStyle } from "@/styles/auth.style";
import {TEXT} from "@/constants/strings"

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const {startSSOFlow} = useSSO();
  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;
    if(!emailAddress || !password){
      alert("Enter neccessary inputs!");
      return ;
    }
    /* if(!emailAddress.endsWith("@gmail.com")){
      alert("Enter the valid Email address!");
      return ;
    } */
    if(password.length <6){
      alert("Password must have 6 or more Character!");
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(tabs)");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.log(err);
      console.error("Invalid Credentials");
    }
  };

  const handleGoogleSignIn = async ()=>{
    try{
      const {createdSessionId,setActive} = await startSSOFlow({strategy:"oauth_google"});
      if(createdSessionId && setActive){
        setActive({session : createdSessionId});
        router.replace("/(tabs)");
      }
    }catch(error){
      console.log(error);
    }
  }
  return (
    <View style={authStyle.container}>
      {/* Brand section */}
      <View style={authStyle.brandSection}>
        <View style={authStyle.logoContainer}>
          <Ionicons name="leaf" size={34} color={COLORS.primary} />
        </View>
        <Text style={authStyle.appName}>{TEXT.brandName}</Text>
        <Text style={authStyle.tagLine}>{TEXT.tagLine}</Text>
        <Image
          style={authStyle.image}
          source={require("../../assets/images/auth-img-2.png")}
        />
      </View>
      <View style={authStyle.formSection}>
        <TouchableOpacity 
          style={{...authStyle.input,alignItems: "center",justifyContent : "center",display:"flex",flexDirection : "row",gap:3}}
          onPress={handleGoogleSignIn}

        >
          
          <Ionicons name="logo-google" size={20}  />
          <Text style={{color:"blue"}}>Continue with Google</Text>
        
        </TouchableOpacity>
        <Text style={{color: "white",marginTop: -5, fontSize : 20}}>Or</Text>
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
          height  : 40,
          backgroundColor : "white",
          justifyContent : "center",
          alignItems : "center",
          borderRadius : 10
        }}>
          <Text style={{color : "blue", textTransform : "uppercase",width : 68}}>Continue</Text>
        </TouchableOpacity>
        <View style={{ display: "flex", flexDirection: "row", gap: 3, marginTop : 5 }}>
          <Text style={authStyle.tagLine}>Don't have an account?</Text>
          <Link href="/signUp">
            <Text style={{color : "blue"}}>Sign up</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
