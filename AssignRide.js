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
// import Login from "./Login";
import { useState, React, useEffect } from "react";
// import BarCodeScanner

const AssignRide = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanData, setScanData] = useState("");
  const [bikeId, setBikeId] = useState("");

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

  const assignRide = () => {
    console.log(bikeId);
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
