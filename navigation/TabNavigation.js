import { TouchableOpacity, View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Tabs/Home";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import Search from "../screens/Tabs/Search";

const Stack = createStackNavigator();
const stackFactory = (initialRoute, name, customConfig) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={name} component={initialRoute} options={{ ...customConfig }} />
    </Stack.Navigator>
  );
};

const BottomTab = createBottomTabNavigator();

export default () => {
  return (
    // <NavigationContainer>
    <BottomTab.Navigator initialRouteName="Home" tabBarOptions={{ labelPosition: "beside-icon" }}>
      <BottomTab.Screen name="HOME">
        {() =>
          stackFactory(Home, "Home", {
            title: "Home",
            headerRight: () => (
              <TouchableOpacity>
                <Text>Hello</Text>
              </TouchableOpacity>
            ),
          })
        }
      </BottomTab.Screen>
      <BottomTab.Screen name="NOTIFICATION">
        {() =>
          stackFactory(Notifications, "Notifications", {
            title: "Notifications",
            headerRight: () => (
              <TouchableOpacity>
                <Text>Hello</Text>
              </TouchableOpacity>
            ),
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
            headerRight: () => (
              <TouchableOpacity>
                <Text>Hello</Text>
              </TouchableOpacity>
            ),
          })
        }
      </BottomTab.Screen>
      <BottomTab.Screen name="SEARCH">
        {() =>
          stackFactory(Search, "Search", {
            title: "Search",
            headerRight: () => (
              <TouchableOpacity>
                <Text>Hello</Text>
              </TouchableOpacity>
            ),
          })
        }
      </BottomTab.Screen>
    </BottomTab.Navigator>
    // </NavigationContainer>
  );
};
