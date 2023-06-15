import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./Login";
import Home from "./Home";
import RequestRide from "./RequestRide";
import AssignRide from "./AssignRide";
import CollectPayments from "./CollectPayments";
import FinishRide from "./FinishRide";
import PaymentScreen from "./PaymentScreen";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeRouter, Link, TabNavigator } from "react-native-url-router";
import { Route } from "react-router";
import { SelectList } from "react-native-dropdown-select-list";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen
            options={{ headerShown: false }}
            name="login"
            component={Login}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="home"
            component={Home}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="requestride"
            component={RequestRide}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="assignride"
            component={AssignRide}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="collectpayment"
            component={CollectPayments}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="finishride"
            component={FinishRide}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="paymentscreen"
            component={PaymentScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>

      {/* <NativeRouter>
        <TabNavigator>
          <Route
            path="/"
            element={
              <>
                <Text>Your root</Text>
                <Link to="feed">
                  <Text>Go to feed</Text>
                </Link>
              </>
            }
          />
          <Route
            path="feed"
            element={
              <>
                <Text>Your feed</Text>
                <Link back>
                  <Text>Go back</Text>
                </Link>
              </>
            }
          />
        </TabNavigator>
      </NativeRouter> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#983456",
    alignItems: "center",
    justifyContent: "center",
  },
});
