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
const CollectPayments = ({navigation}) => {
  let data={};
  let endTime;
  let finalinfo;
  const [bikeId,setBikeId] =useState("");
  const [email,setEmail] =useState("");
  const [name,setName] =useState("");
  const [numberofBike,setNumberofBike] =useState("");
  const [startTime,setStartTime] =useState("");
  const [userId,setUserId] =useState("");
  const [userEmail,setUserEmail] =useState("");
  const [isRideOver, setIsRideOver] = useState(false);
  const [flag,setFlag] = useState(false);
  const [endingTime,setEndingTime ] = useState("");
  const handleOnGoingRides = async({navigation}) =>{
    console.log("daldfh");
    const value = await AsyncStorage.getItem("assignRide_obj");
    data = JSON.parse(value);
    finalinfo = data;
    console.log("data from collect payments: ", data);
    const ride_end = await AsyncStorage.getItem("ride_end");
    endTime = await AsyncStorage.getItem("endTime");
    setEndingTime(endTime);
    console.log("ride_end",ride_end," endTime ", endTime);
    if(ride_end === "true"){
      setIsRideOver(true);
    }
    console.log("isRideOver:    ",isRideOver);
    setBikeId(data.bikeId);
    setEmail(data.email);
    setName(data.name);
    setNumberofBike(data.numberOfBike);
    setStartTime(data.start_time);
    setUserId(data.userId);
    setUserEmail(data.user_email);
    console.log(bikeId);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Collect Payments</Text>
      <TouchableOpacity style={styles.button} onPress={handleOnGoingRides}>
        <Text style={styles.loginText}>Ongoing Rides</Text>
      </TouchableOpacity>
      {data && (
        <>     
          <TouchableOpacity style={styles.reqButton} onPress ={()=> setFlag(!flag)}>
            <Text style={styles.loginText}>
               {name} 
            </Text>
            <Text style={styles.loginText}>  
               {email}
            </Text>
            
          </TouchableOpacity>
          {flag && (<>
          <View style={styles.reqExtraButton}>
          <Text style={styles.loginText}>Id: {userId}</Text>
          <Text style={styles.loginText}>Total Scooters: {numberofBike}</Text>
          <Text style={styles.loginText}>Scooter Id: {bikeId}</Text>
          <Text style={styles.loginText}>Start Time: {startTime}</Text>
          {isRideOver && (<>
            <Text style={styles.loginText}>End Time: {endingTime}</Text>

<TouchableOpacity style={styles.paybutton} onPress={()=>navigation.navigate("paymentscreen", { data: finalinfo })}>
<Text style={styles.loginText}>pay</Text>
</TouchableOpacity>
          </>)}
            
          
          </View>
          </>)}
        </>
      )}
      

  
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
    marginBottom: 20,
    marginTop: 40,
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
    backgroundColor: "orange",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  paybutton: {
    width: "40%",
    backgroundColor: "orange",
    borderRadius: 25,
    height: 40,
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
    backgroundColor: "#003f5c",
    // borderRadius: 10,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    // marginBottom: 10,
    // borderWidth: 1,
    // borderBottomWidth: 0.5,
    // borderColor:"black",
  },
  reqExtraButton: {
    width: "80%",
    backgroundColor: "#003f5c",
    // borderRadius: 10,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 5,
    marginBottom: 10,
    // borderWidth: 1,
    // borderColor:"black",
    
  },
  shadowProp: {  
    shadowOffset: {width: -2, height: 4},  
    shadowColor: '#171717',  
    shadowOpacity: 0.2,  
    shadowRadius: 3,  
  },  
});
export default CollectPayments