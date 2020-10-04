import { View } from "react-native";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import Search from "../screens/Search";

const BottomTab = createBottomTabNavigator();

export default () => {
  return (
    // <NavigationContainer>
    <BottomTab.Navigator initialRouteName="Home" tabBarOptions={{ labelPosition: "beside-icon" }}>
      <BottomTab.Screen name="HOME" component={Home} />
      <BottomTab.Screen name="NOTIFICATION" component={Notifications} />
      <BottomTab.Screen
        name="ADD"
        component={View}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("PhotoNavigation");
          },
        })}
      />

      <BottomTab.Screen name="PROFILE" component={Profile} />
      <BottomTab.Screen name="SEARCH" component={Search} />
    </BottomTab.Navigator>
    // </NavigationContainer>
  );
};
