import { Pressable, Text, TouchableOpacity, View, Image } from "react-native";
import {authStyle} from "../../styles/auth.style";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={authStyle.container}>
      <Text style={authStyle.title}>This text written by me Nitish kumar</Text>
      <TouchableOpacity onPress={()=>alert("You click on me")}>
        <Image 
        source={require("../../assets/images/icon.png")}
        style={authStyle.image}
        />
      </TouchableOpacity>
      
      <Pressable onPress={()=>alert("This is Image tahen from Unsplash")}>
      <Image
        source={{
          uri: "https://plus.unsplash.com/premium_photo-1731680781010-4be752ecab0f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
        }}
        style={authStyle.image}
      />
      </Pressable>
        <Link href={"/profile"} style={authStyle.title}>Profile screen</Link>
        
    </View>
  );
}
