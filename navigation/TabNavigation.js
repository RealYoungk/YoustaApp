import { TouchableOpacity, View, Text, Platform } from "react-native";
import React from "react";
import { Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Tabs/Home";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import Search from "../screens/Tabs/Search";
import MessagesLink from "../components/MessagesLink";
import NavIcon from "../components/NavIcon";
import { stackStyles } from "./config";

const Stack = createStackNavigator();
const stackFactory = (initialRoute, name, customConfig) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          ...stackStyles,
        },
      }}
    >
      <Stack.Screen name={name} component={initialRoute} options={{ ...customConfig }} />
    </Stack.Navigator>
  );
};

const BottomTab = createBottomTabNavigator();

export default () => {
  return (
    // <NavigationContainer>
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        labelPosition: "beside-icon",
        showLabel: false,
        tabStyle: {
          backgroundColor: "#FAFAFA",
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = Platform.OS === "ios" ? "ios-" : "md-";
          if (route.name === "HOME") {
            iconName += "home";
          } else if (route.name === "SEARCH") {
            iconName += "search";
          } else if (route.name === "ADD") {
            iconName += "add";
          } else if (route.name === "NOTIFICATION") {
            iconName += "heart";
          } else if (route.name === "PROFILE") {
            iconName += "person";
          }
          return <NavIcon name={iconName} size={30} focused={focused} />;
        },
      })}
    >
      <BottomTab.Screen name="HOME">
        {() =>
          stackFactory(Home, "Home", {
            title: "Home",
            headerRight: () => <MessagesLink />,
            headerTitle: () => <NavIcon name="logo-instagram" size={36} />,
          })
        }
      </BottomTab.Screen>
      <BottomTab.Screen name="NOTIFICATION">
        {() =>
          stackFactory(Notifications, "Notifications", {
            title: "Notifications",
            headerRight: () => <MessagesLink />,
            headerTitle: () => <NavIcon name="logo-instagram" size={36} />,
          })
        }
      </BottomTab.Screen>
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

      <BottomTab.Screen name="PROFILE">
        {() =>
          stackFactory(Profile, "Profile", {
            title: "Profile",
            headerRight: () => <MessagesLink />,
            headerTitle: () => <NavIcon name="logo-instagram" size={36} />,
          })
        }
      </BottomTab.Screen>
      <BottomTab.Screen name="SEARCH">
        {() =>
          stackFactory(Search, "Search", {
            title: "Search",
            headerRight: () => <MessagesLink />,
            headerTitle: () => <NavIcon name="logo-instagram" size={36} />,
          })
        }
      </BottomTab.Screen>
    </BottomTab.Navigator>
    // </NavigationContainer>
  );
};
