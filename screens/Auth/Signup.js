import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { Alert } from "react-native";
import styled from "styled-components";
import { useLogIn } from "../../AuthContext";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { CONFIRM_SECRET, CREATE_ACCOUNT } from "./AuthQueries";
import * as Facebook from "expo-facebook";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: white;
`;

const Text = styled.Text``;

const FBContainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-color: ${(props) => props.theme.lightGreyColor};
  border-style: solid;
`;

export default ({ navigation, route }) => {
  const { email } = route.params;
  const fNameInput = useInput("");
  const lNameInput = useInput("");
  const emailInput = useInput("");
  const usernameInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: usernameInput.value,
      email: emailInput.value,
      firstName: fNameInput.value,
      lastName: lNameInput.value,
    },
  });

  const facebookLogIn = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "712093396059246",
      });
      // console.log(a);
      // const a = await Facebook.logInWithReadPermissionsAsync();
      const { type, token } = await Facebook.logInWithReadPermissionsAsync();

      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  const handleSignup = async () => {
    const { value: email } = emailInput;
    const { value: fName } = fNameInput;
    const { value: lName } = lNameInput;
    const { value: username } = usernameInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return Alert.alert("That email is invalid");
    }
    if (fName === "" || lName === "") {
      return Alert.alert("I need your name");
    }
    if (username === "") {
      return Alert.alert("Invalid username");
    }
    try {
      setLoading(true);
      const {
        data: { createAccount },
      } = await createAccountMutation();
      if (createAccount) {
        Alert.alert("Account created", "Login now!");
        navigation.navigate("Login", { email });
      }
    } catch (e) {
      Alert.alert("Username taken.", "Login instead");
      navigation.navigate("Login", { email });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <AuthInput {...fNameInput} placeholder="First name" autoCapitalize="words" />
          <AuthInput {...lNameInput} placeholder="Last name" autoCapitalize="words" />
          <AuthInput
            {...emailInput}
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="send"
            autoCorrect={false}
          />
          <AuthInput
            {...usernameInput}
            placeholder="Username"
            returnKeyType="send"
            autoCorrect={false}
          />
          <AuthButton text="Sign up" onPress={handleSignup} loading={loading} />
          <FBContainer>
            {/* <LoginButton
              onLoginFinished={(error, result) => {
                if (error) {
                  console.log("login has error: " + result.error);
                } else if (result.isCancelled) {
                  console.log("login is cancelled.");
                } else {
                  AccessToken.getCurrentAccessToken().then((data) => {
                    console.log(data.accessToken.toString());
                  });
                }
              }}
              onLogoutFinished={() => console.log("logout.")}
            /> */}
            <AuthButton
              bgColor={"#2D4DA7"}
              loading={false}
              onPress={facebookLogIn}
              text={"FaceBook 연결하기"}
            />
          </FBContainer>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
