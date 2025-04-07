import { COLORS } from "@/constants/theme";
import { StyleSheet, Dimensions, Button } from "react-native";
const { width, height } = Dimensions.get("window");


export const authStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  brandSection: {
    alignItems: "center",
    marginTop: 30,
  },
  logoContainer: {
    width: 65,
    height: 65,
    borderRadius: 20,
    backgroundColor: "rgba(74, 222, 128, 0.15)",
    justifyContent : "center" ,
    alignItems : "center",
    marginBottom : 8
  },
  appName : {
    fontSize : 42,
    fontWeight : "700",
    fontFamily : "JetBrainsMono-Medium",
    color : COLORS.primary,
    letterSpacing : 0.5,
    marginBottom : 2,
  },
  tagLine : {
    fontSize : 16,
    color : COLORS.grey,
    letterSpacing : 1,
    textTransform : "lowercase"
  },
  formSection : {
    display : "flex",
    justifyContent : "center",
    alignItems : "center"
  },
  input : {
    alignContent : "center",
    justifyContent : "center",
    width : width * 0.8,
    height : 40,
    backgroundColor : "white",
    color : COLORS.black,
    borderRadius : 10,
    paddingLeft : 15,
    marginBottom : 8
  },
  title: {
    fontSize: 20,
  },
  image: {
    width: 200,
    height: 200,
    margin: 10,
    backgroundColor: "black",
    objectFit: "contain",
  },
});

export const verifyEmail = StyleSheet.create({
  innerContainer : {
    display: "flex",
    alignItems: "center",
   marginTop : 100
  },
  verifyText : {
    fontSize: 20,
    color: "white",

  },
  button : {
    height : 40,
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 4
  }
})