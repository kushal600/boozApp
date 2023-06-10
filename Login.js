// import { StatusBar } from "expo-status-bar";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Button,
//   Alert,
//   SafeAreaView,
//   Pressable,
// } from "react-native";
// // import Login from "./Login";
// import { useState } from "react";
// // import { auth } from "./firebase";
// // import { firebase } from "./firebase";

// const Login = ({ navigation }) => {
//   const [value, setValue] = useState(false);
//   const [name, setName] = useState("");
//   const [pass, setPass] = useState("");
//   const alert = () => {
//     console.log(name, pass);
//     // Alert.alert(`name is ${name} and password is ${pass}`);
//     setValue(!value);
//     navigation.navigate("home", { myName: `${name}` });
//   };
//   const register = () => {
//     console.log("register");
//   };
//   return (
//     <View>
//       <Text style={styles.test}>Login</Text>
//       <View style={styles.inputContainer}>
//         <View style={styles.label}>
//           <Text>Enter Email: </Text>
//           <TextInput
//             style={styles.inputStyle}
//             autoCapitalize="none"
//             autoCorrect={false}
//             defaultValue={name}
//             onChangeText={(actualData) => setName(actualData)}
//           />
//         </View>
//         <View style={styles.label}>
//           <Text>Enter password: </Text>
//           <TextInput
//             style={styles.inputStyle}
//             secureTextEntry={true}
//             defaultValue={pass}
//             onChange={(actualData) => setPass(actualData)}
//           />
//         </View>
//       </View>
//       <View style={styles.button}>
//         <Button
//           title="LogIN"
//           style={styles.button}
//           onPress={alert}
//           color={value ? "#987657" : undefined}
//         />
//       </View>
//       <View style={styles.button}>
//         <Button
//           title="Register"
//           style={styles.button}
//           onPress={register}
//           color={value ? "#987657" : undefined}
//         />
//       </View>
//       <Pressable style={styles.buttoncss}>
//         <Text style={styles.textcss}>BUTTON</Text>
//       </Pressable>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     backgroundColor: "#983456",
//     // alignItems: "center",
//     // justifyContent: "center",
//   },
//   test: {
//     height: 100,
//     fontSize: 30,
//     marginLeft: 40,
//     marginTop: 40,
//   },
//   label: {
//     marginLeft: 10,
//     marginTop: 10,
//     lineHeight: 25,
//   },
//   inputStyle: {
//     borderWidth: 1,
//     paddingHorizontal: 15,
//     paddingVertical: 7,
//     borderRadius: 1,
//     fontSize: 18,
//   },
//   button: {
//     marginTop: 13,
//   },
//   buttoncss: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 50,
//     elevation: 3,
//     backgroundColor: "orange",
//   },
//   textcss: {
//     fontSize: 16,
//     lineHeight: 21,
//     fontWeight: "bold",
//     letterSpacing: 0.25,
//     color: "white",
//   },
// });

// export default Login;
// #003f5c background#0066b2
// #465881 input background#72A0C1
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from "react-native";
// import { Axios } from "axios";
import axios from "axios";
// import Login from "./Login";
import { useState } from "react";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const handleLogin = async () => {
    // Alert.alert("logged in");
    const obj = {
      email: email,
      password: pass,
    };
    const response = await axios.post(`http://10.0.2.2:8000/api/user/login`, {
      // name: "kushal",
      email: email,
      password: pass,
      // password_confirmation: "123",
      // tc: true,
    });
    if (response.data.status == "success") {
      navigation.navigate("home", { myName: `${email}` });
    }
    console.log(response.data.status);

    // navigation.navigate("home", { myName: `${name}` });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>BOOZ</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPass(text)}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "orange",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#72A0C1",
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
    backgroundColor: "orange",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
});

export default Login;
