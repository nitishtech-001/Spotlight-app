import { COLORS } from "@/constants/theme";
import { StyleSheet, Dimensions } from "react-native";
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
    marginBottom : 14
  },
  appName : {
    fontSize : 42,
    fontWeight : "700",
    fontFamily : "JetBrainsMono-Medium",
    color : COLORS.primary,
    letterSpacing : 0.5,
    marginBottom : 8,
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
    marginBottom : 8
  },
  title: {
    fontSize: 20,
  },
  image: {
    width: 200,
    height: 200,
    margin: 30,
    backgroundColor: "black",
    objectFit: "contain",
  },
});
