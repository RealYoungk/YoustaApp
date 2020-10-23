import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { createStackNavigator } from "@react-navigation/stack";
import { stackStyles } from "./config";
import styles from "../styles";

const Tab = createMaterialTopTabNavigator();

const PhotoTabs = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{
        indicatorStyle: {
          backgroundColor: styles.blackColor,
        },
        tabStyle: {
          backgroundColor: styles.greyColor,
        },
      }}
      screenOptions={{
        headerStyle: {
          ...stackStyles,
        },
      }}
    >
      <Tab.Screen name="사진" component={TakePhoto} />
      <Tab.Screen name="사진 선택" component={SelectPhoto} />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator initialRouteName={"PhotoTabs"} headerMode={"screen"}>
      <Stack.Screen name="PhotoTabs" component={PhotoTabs} />
      <Stack.Screen name="UploadPhoto" component={UploadPhoto} options={{ headerTitle: false }} />
    </Stack.Navigator>
  );
};
