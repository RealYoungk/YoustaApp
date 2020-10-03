import React from "react";
import { View } from "react-native";
import { useIsLoggedIn } from "../AuthContext";
import AuthNavigation from "../navigation/AuthNavigation";
import TabNavigation from "../navigation/TabNavigation";

export default () => {
  // const isLoggedIn = useIsLoggedIn();
  const isLoggedIn = true;
  return (
    <View style={{ flex: 1 }}>
      {isLoggedIn ? (
        <TabNavigation />
      ) : (
        <AuthNavigation />
        // <TouchableOpacity onPress={logIn}>
        //   <Text>Log in</Text>
        // </TouchableOpacity>
      )}
    </View>
  );
};
