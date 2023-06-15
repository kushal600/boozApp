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
const RequestRide = ({ navigation }) => {
  const [mobileNo, setMobileNo] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [name, setName] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [OTP, setOTP] = useState("");
  const [isVerify, setIsVerify] = useState(false);
  const [selected, setSelected] = useState("");
  const [id, setId] = useState("");
  const [ride, setRide] = useState("");
  const rideOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ];
  const idOptions = [
    { value: "Aadhar Card", label: "Aadhar Card" },
    { value: "Election Card", label: "2Election Card" },
    { value: "Pan Card", label: "Pan Card" },
    { value: "licence", label: "licence" },
    { value: "passsport", label: "passsport" },
    { value: "Ration Card", label: "Ration Card" },
  ];
  const handleFind = (mob) => {
    

    setIsValid(true);
  };
  const handleSendOTP = async () => {
    console.log(mobileNo);
    // 10.0.2.2:8000
    const response = await axios.post(`http://10.0.2.2:8000/api/user/otpauth`, {
      
      userEmail: mobileNo,

      
    });
    
    if (response.data.status == "success") {
      setIsOTPSent(true);
    }
  };
  const verifyOTP = async () => {
    console.log(OTP);
    // // 10.0.2.2:8000
    const response = await axios.post(
      `http://10.0.2.2:8000/api/user/otpverify`,
      {
       
        enteredOTP: OTP,

        
      }
    );
    
    if (response.data.status == "success") {
      setIsVerify(true);
    }
  };
  const addNewRequest = async () => {
    
    var today = new Date();
    var requestTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var requestDate = today.getDay() + "/" + today.getMonth() + "/" + today.getFullYear();
    // console.log(year, "time: ", time);
    const obj = {
      number: mobileNo,
      name: name,
      ride: ride,
      id: id,
      requestTime: requestTime,
      requestDate : requestDate,
    };
    console.log(obj);
    const jsonValue = JSON.stringify(obj);
    await AsyncStorage.setItem("storage_Key", jsonValue);

    const value = await AsyncStorage.getItem("storage_Key");
    // console.log("value", value);
    console.log("json: ", JSON.parse(value));
    navigation.navigate("home", { newRequest: JSON.parse(value) });
  };
  return (
    // <View>
    //   <View style={styles.test}>
    //     <Text style={styles.fonts}>Request Ride</Text>
    //   </View>
    //   <View style={styles.inputContainer}>
    //     <View style={styles.label}>
    //       <Text>Enter MobileNumber: </Text>
    //       <TextInput
    //         style={styles.inputStyle}
    //         autoCapitalize="none"
    //         autoCorrect={false}
    //         defaultValue={mobileNo}
    //         onChangeText={(actualData) => setMobileNo(actualData)}
    //       />
    //     </View>
    //   </View>
    //   <View style={styles.button}>
    //     {!isValid && (
    //       <Button title="Find" style={styles.button} onPress={find} />
    //     )}
    //     {isValid && (
    //       <>
    //         <TextInput
    //           style={styles.inputStyle}
    //           autoCapitalize="none"
    //           autoCorrect={false}
    //           placeholder="Enter Your Name"
    //           defaultValue={name}
    //           onChangeText={(actualData) => setName(actualData)}
    //         />
    //         <View style={styles.button}>
    //           <Button title="Send OTP" onPress={sendOTP} />
    //         </View>
    //       </>
    //     )}
    //     {isOTPSent && (
    //       <>
    //         <TextInput
    //           style={styles.inputStyle}
    //           autoCapitalize="none"
    //           autoCorrect={false}
    //           placeholder="Enter OTP"
    //           defaultValue={OTP}
    //           onChangeText={(actualData) => setOTP(actualData)}
    //         />
    //         <View style={styles.button}>
    //           <Button title="Veify OTP" onPress={verifyOTP} />
    //         </View>
    //       </>
    //     )}
    //     {isVerify && (
    //       <>
    //         <View>
    //           <Text>Select Ride: </Text>
    //           <SelectList
    //             data={rideOptions}
    //             setSelected={setSelected}
    //             onSelect={() => setRide(selected)}
    //           />
    //         </View>
    //         <View>
    //           <Text>Select Id: </Text>
    //           <SelectList
    //             data={idOptions}
    //             setSelected={setSelected}
    //             onSelect={() => setId(selected)}
    //           />
    //         </View>
    //         <View style={styles.button}>
    //           <Button title="Add New Request" onPress={addNewRequest} />
    //         </View>
    //       </>
    //     )}
    //   </View>
    // </View>
    <View style={styles.container}>
      <Text style={styles.logo}>Request Ride</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email for Otp"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setMobileNo(text)}
        />
      </View>
      {!isValid && (
        <TouchableOpacity style={styles.button} onPress={handleFind}>
          <Text style={styles.loginText}>Find</Text>
        </TouchableOpacity>
      )}
      {/* <TouchableOpacity style={styles.button} onPress={handleFind}>
        <Text style={styles.loginText}>Find</Text>
      </TouchableOpacity> */}
      {isValid && (
        <>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Name of Rider"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => setName(text)}
            />
          </View>
          {!isOTPSent && (
            <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
              <Text style={styles.loginText}>Send OTP</Text>
            </TouchableOpacity>
          )}
          {/* <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
            <Text style={styles.loginText}>Send OTP</Text>
          </TouchableOpacity> */}
        </>
      )}
      {isOTPSent && (
        <>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Enter OTP"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => setOTP(text)}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={verifyOTP}>
            <Text style={styles.loginText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}
      {isVerify && (
        <>
          <View>
            <TextInput style={styles.inputTextSelect}>Select Ride: </TextInput>
            <SelectList
              data={rideOptions}
              setSelected={setSelected}
              onSelect={() => setRide(selected)}
            />
          </View>
          <View>
            <TextInput style={styles.inputTextSelect}>Select Id: </TextInput>
            <SelectList
              style={styles.selectMenu}
              data={idOptions}
              setSelected={setSelected}
              onSelect={() => setId(selected)}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={addNewRequest}>
            <Text style={styles.loginText}>Add New Request</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
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
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
  selectMenu: {
    borderRadius: 25,
  },
});
export default RequestRide;
