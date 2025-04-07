import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { authStyle, verifyEmail } from '@/styles/auth.style'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants/theme'
import { Image } from 'react-native'
import {TEXT} from "@/constants/strings"


export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return
    if(!emailAddress || !password){
      alert("Enter neccessary fields!")
      return ;
    }
    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        alert("Sign up completed");
        router.replace('/(tabs)')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <View style={authStyle.container}>
        <View style={verifyEmail.innerContainer}>
        <Text style={verifyEmail.verifyText}>Verify your email</Text>
        <TextInput
          style={authStyle.input}
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress} style={verifyEmail.button}>
          <Text style={verifyEmail.verifyText}>Verify</Text>
        </TouchableOpacity>
        </View>
      </View>
    )
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
        <TouchableOpacity onPress={onSignUpPress} style={{
          width : 150,
          height  : 40,
          backgroundColor : "white",
          justifyContent : "center",
          alignItems : "center",
          borderRadius : 10
        }}>
          <Text style={{color : "blue", textTransform : "uppercase",width : 68}}>Continue</Text>
        </TouchableOpacity>
        <View style={{ display: "flex", flexDirection: "row", gap: 3, marginTop : 20 }}>
          <Text style={authStyle.tagLine}>Don't have an account?</Text>
          <Link href="/login">
            <Text style={{color : "blue"}}>Sign in</Text>
          </Link>
        </View>
      </View>
    </View>
  )
}