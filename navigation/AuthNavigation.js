import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthHome from "../screens/Auth/AuthHome";
import Confirm from "../screens/Auth/Confirm";
import Login from "../screens/Auth/Login";
import Signup from "../screens/Auth/Signup";

const Stack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      {/* initialRouteName={Confirm}  */}
      <Stack.Navigator headerMode={"none"}>
        <>
          <Stack.Screen name="AuthHome" component={AuthHome} />
          <Stack.Screen name="Confirm" component={Confirm} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
