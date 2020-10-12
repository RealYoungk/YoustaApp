import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { createStackNavigator } from "@react-navigation/stack";
import { stackStyles } from "./config";

const Tab = createMaterialTopTabNavigator();

const PhotoTabs = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        headerStyle: {
          ...stackStyles,
        },
      }}
    >
      <Tab.Screen name="SelectPhoto" component={SelectPhoto} />
      <Tab.Screen name="TakePhoto" component={TakePhoto} />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator initialRouteName={"PhotoTabs"} headerMode={"none"}>
      <Stack.Screen name="PhotoTabs" component={PhotoTabs} />
      <Stack.Screen name="UploadPhoto" component={UploadPhoto} />
    </Stack.Navigator>
  );
};
