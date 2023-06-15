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
// import Login from "./Login";
import { useState } from "react";

const Home =  ({ route, navigation }) => {
  // const [isNull, setIsNull] = useState(false);
  const name = route.params.myName;
  const req = route.params.newRequest;
  const data = route.params.data;
  const ride_end = route.params.ride_end;
  
  console.log("home dtaa",data);
  console.log("ride_end",ride_end);
  const reqtemp = {
    id: "Election Card",
    name: "kushal",
    number: "8153033600",
    ride: "3",
    requestTime: "14:49:20",
    requestDate: "3/5/2023",
  };
  // if (name) {
  //   setIsNull(true);
  // }
  // console.log(name);
  // const newReq = route.params.newRequest;
  // console.log("home", newReq);
  // const alert = () => {
  //   // console.log(name, pass);
  //   // Alert.alert(`name is ${name} and password is ${pass}`);
  //   // setValue(!value);
  //   navigation.navigate("login");
  // };

  Alert.alert(`Hello, Welcome to Booz World`);
  const handleLogOUT = () => {
    navigation.navigate("login");
  };

  // const test = () => {
  //   console.log("req", req.name);
  // };
  const handleAssignRide = () => {
    console.log("assignride");
    navigation.navigate("assignride",{ newReq: req });
  };
  return (
    // <View>
    //   <View style={styles.test}>
    //     <Text style={styles.fonts}>HomePage</Text>
    //   </View>
    //   <View style={styles.button}>
    //     <Button
    //       title="Request Ride"
    //       onPress={() => navigation.navigate("requestride")}
    //     />
    //   </View>
    //   {/* {isNull && Alert.alert(name)} */}
    //   <View style={styles.button}>
    //     <Button title="LogOuT" onPress={logOUT} />
    //   </View>
    // </View>
    <View style={styles.container}>
      <Text style={styles.logo}>Home</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("requestride")}
      >
        <Text style={styles.loginText}>Request Ride</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("collectpayment")}>
        <Text style={styles.loginText}>Collect Payments</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.loginText}>Today's Payments</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("finishride")}>
        <Text style={styles.loginText}>Finish Rides</Text>
      </TouchableOpacity>
      {reqtemp && (
        <>
          <Text style={styles.logo}>Requests</Text>
          <TouchableOpacity style={styles.reqButton} onPress={handleAssignRide}>
            <Text style={styles.loginText}>
              {reqtemp.name} has requested {reqtemp.ride} rides
            </Text>
            <Text style={styles.loginText}>
              {reqtemp.requestDate} , {reqtemp.requestTime} 
            </Text>
            
          </TouchableOpacity>
        </>
      )}
      {req && (
        <>
          {/* <Text style={styles.logo}>Requests</Text> */}
          <TouchableOpacity style={styles.reqButton} onPress={handleAssignRide}>
            <Text style={styles.loginText}>
              {req.name} has requested {req.ride} rides
            </Text>
            <Text style={styles.loginText}>
              {req.requestDate} , {req.requestTime} 
            </Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogOUT}>
        <Text style={styles.loginText}>LOG OUT</Text>
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
});
export default Home;
