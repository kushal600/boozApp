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
import axios from "axios";
// import Login from "./Login";
import { useState } from "react";
// import SelectInput from "native-base-select";
// import { Select } from "react-select";

const PaymentScreen = ({navigation,route}) => {
  const [selected, setSelected] = useState("");
  const [cost,setCost] = useState("");
  const [flag,setFlag] = useState(false);

    const data = route.params.data;
    // const endingTime = route.params.endTime;
    // console.log("name is: ", data);
    // console.log("ending time: ", endingTime);
    const handleCash = async () =>{
        console.log("paid with cash");
        // email, name, bikeId, method, user_email
        const email = await AsyncStorage.getItem("email");

        const obj = {
          email : email,
          name: data.name,
          bikeId : data.bikeId,
          method :"cash",
          user_email: data.user_email,


      };
      console.log(obj,"payment object");
        const response = await axios.post(`http://10.0.2.2:8000/api/user/payment`, obj);
        console.log(response.data.status,"payment method");

    };
    const handleOnlinePayment = async ()=>{
        console.log("paid online");
        const email = await AsyncStorage.getItem("email");

        const obj = {
          email : email,
          name: data.name,
          bikeId : data.bikeId,
          method :"online",
          user_email: data.user_email,


      };
      console.log(obj,"payment object");
        const response = await axios.post(`http://10.0.2.2:8000/api/user/payment`, obj);
        console.log(response.data.status," online payment method");

    }
    const discountOptions = [
        { value: "--", label: "--" },
        { value: "battery", label: "battery" },
        { value: "timing", label: "timing" },
        { value: "marketin", label: "marketin" },
      ];
      const handleDiscount = async() =>{
        const email = await AsyncStorage.getItem("email");
        console.log(selected);
        // email, user_email, name, numberOfBike, bikeId, reason
        const obj = {
            email : email,
            user_email: data.user_email,
            name: data.name,
            numberOfBike :data.numberOfBike,
            bikeId : data.bikeId,
            reason: selected

        };
        console.log(obj,"objjjjjjjjjjjjjjjjject");
        const response = await axios.post(`http://10.0.2.2:8000/api/user/rideendpayment`, obj);
        console.log(response.data.cost," :payment screen");
        if(response.data.cost){
          setCost(response.data.cost);
          setFlag(true);
        }

      }
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Payment</Text>
    
            <Text style={styles.loginText}>
               sdfsdfa 
            </Text>
            <View>
            <TextInput style={styles.inputTextSelect}>Discount Reason: </TextInput>
            <SelectList
              data={discountOptions}
              setSelected={setSelected}
              onSelect={handleDiscount}
            />
          </View>
          {flag && (<>
        <TextInput style={styles.inputTextSelectCost}>Total cost is: {cost} </TextInput>
      
      </>)}
          <TextInput style={styles.inputTextSelect}>Select Payment Method </TextInput>
          <TouchableOpacity style={styles.button} onPress={handleCash}>

        <Text style={styles.loginText}>Cash</Text>
      </TouchableOpacity>
      <TextInput style={styles.inputTextSelect}>------OR------ </TextInput>
      
      <TouchableOpacity style={styles.button} onPress={handleOnlinePayment}>
        <Text style={styles.loginText}>Online Payment</Text>
      </TouchableOpacity>
      
         
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    logo: {
      fontWeight: "bold",
      fontSize: 25,
      color: "#003f5c",
      marginBottom: 40,
    },
    inputView: {
      width: "80%",
      backgroundColor: "orange",
      borderRadius: 25,
      height: 50,
      marginBottom: 20,
  
      justifyContent: "center",
      padding: 20,
    },
    inputText: {
      height: 50,
      color: "white",
    },
    inputTextSelect: {
      height: 50,
      color: "#003f5c",
      fontSize: 20,
    },
    inputTextSelectCost: {
      height: 60,
      color: "red",
      fontSize: 30,
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
      width: "80%",
      backgroundColor: "#003f5c",
      borderRadius: 25,
      height: 100,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 5,
      marginBottom: 10,
    },
    display: {
        width: "80%",
        backgroundColor: "#003f5c",
        // borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        marginBottom: 10,
      },
    loginText: {
      color: "white",
      fontSize: 20,
    },
    selectMenu: {
      borderRadius: 25,
    },
  });
export default PaymentScreen