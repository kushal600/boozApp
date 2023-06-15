import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-native-qrcode-svg";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
// import Login from "./Login";
import { useState, React, useEffect } from "react";
// import BarCodeScanner

const FinishRide = ({navigation}) => {
    const [bikeId,setBikeId] = useState("");
    const [userEmail,setUserEmail] = useState("");
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    

    let data={};
    const handleEndRide = async() =>{
        // email, name, user_email, bikeId, end_time
        // console.log(bikeId);
        const value = await AsyncStorage.getItem("assignRide_obj");
        const email = await AsyncStorage.getItem("email");
        console.log("email", email);
        data = JSON.parse(value);
    // console.log("data from End Ride: ", data.name);
    if(data){
        // setEmail(email);
        // setName(data.name);
        // setUserEmail(data.user_email);
        // setBikeId(bikeId);
        var today = new Date();
        var endTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
       

            await AsyncStorage.setItem("endTime",endTime);
        
        const objs = {
            email:email,
            name: data.name,
            user_email: data.user_email,
            bikeId: bikeId,
            end_time: endTime,
        };
        console.log("Final",objs);
        const response = await axios.post(`http://10.0.2.2:8000/api/user/rideend`, objs);
        console.log(response.data.status);
        if(response.data.status == "updated"){
            await AsyncStorage.setItem("ride_end","true");
            navigation.navigate("home", { ride_end: "true" });
        }

    }
    
    }
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Finish Ride</Text>

      
      
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="BikeId..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setBikeId(text)}
        />
      </View>
      <TouchableOpacity style={styles.buttonBikeId} onPress={handleEndRide}>
        <Text style={styles.loginText}>End Ride🚲</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      // justifyContent: "center",
    },
    logo: {
      fontWeight: "bold",
      fontSize: 25,
      color: "#003f5c",
      // marginBottom: 30,
      marginTop: 40,
    },
    inputView: {
      width: "80%",
      backgroundColor: "orange",
      borderRadius: 25,
      height: 50,
      marginBottom: 10,
      marginTop: "135%",
  
      justifyContent: "center",
      padding: 20,
    },
    inputText: {
      height: 50,
      color: "white",
    },
    forgot: {
      color: "white",
      fontSize: 11,
    },
    loginBtn: {
      width: "80%",
      backgroundColor: "#003f5c",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      marginBottom: 10,
    },
    button: {
      width: "40%",
      backgroundColor: "#003f5c",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 5,
      marginBottom: 10,
    },
    loginText: {
      color: "white",
    },
    reqButton: {
      width: "80%",
      backgroundColor: "red",
      borderRadius: 10,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 5,
      marginBottom: 10,
    },
    buttonBikeId: {
      width: "40%",
      backgroundColor: "#003f5c",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      // marginTop: 20,
      marginBottom: 10,
    },
  });
export default FinishRide