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

const AssignRide = ({ navigation , route}) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanData, setScanData] = useState("");
  const [bikeId, setBikeId] = useState("");
  const newReq = route.params.newReq;
  console.log("inside asignride", newReq);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (!hasPermission) {
    return (
      <View>
        <Text>Please Grant Permission to access the camera</Text>
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanData(data);
    console.log("data:", data);
    console.log("type:", type);
  };

  const assignRide = async() => {
    var today = new Date();
    var startTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // name, email, bikeId, userId, numberOfBike
    const obj = {
      name: newReq.name,
      email: "kushal@gmail.com",
      bikeId : bikeId,
      userId: newReq.id,
      numberOfBike: newReq.ride,
      start_time: startTime,
      user_email: newReq.number,
    };
    console.log("objjjjjjj", obj);
    // const jsonValue = JSON.stringify(obj);
    // await AsyncStorage.setItem("assign_ride", jsonValue);

    // const value = await AsyncStorage.getItem("assign_ride");
    // console.log("for collect payments: ",value);

    const response = await axios.post(`http://10.0.2.2:8000/api/user/bike`, obj);
    console.log(response.data.status);
    // await AsyncStorage.setItem("isRideAssigned", jsonValue);
    const reqobj = JSON.stringify(obj);
    await AsyncStorage.setItem('assignRide_obj', reqobj);
    console.log("token stored")
    navigation.navigate("home", { data: obj });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Assign Ride</Text>

      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("home", { myName: "" })}
      >
        <Text style={styles.loginText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="BikeId..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setBikeId(text)}
        />
      </View>
      <TouchableOpacity style={styles.buttonBikeId} onPress={assignRide}>
        <Text style={styles.loginText}>Assign Ride🚲</Text>
      </TouchableOpacity>
    </View>
  );
};
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
export default AssignRide;
