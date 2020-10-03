import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useIsLoggedIn, useLogIn, useLogOut } from "../AuthContext";
import AuthNavigation from "../navigation/AuthNavigation";

export default () => {
  const isLoggedIn = useIsLoggedIn();
  const logIn = useLogIn();
  const logOut = useLogOut();

  return (
    <View style={{ flex: 1 }}>
      {isLoggedIn ? (
        <TouchableOpacity onPress={logOut}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      ) : (
        <AuthNavigation />
        // <TouchableOpacity onPress={logIn}>
        //   <Text>Log in</Text>
        // </TouchableOpacity>
      )}
    </View>
  );
};
