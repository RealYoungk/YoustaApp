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

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: white;
`;

const Text = styled.Text``;

export default ({ route, navigation }) => {
  const confirmInput = useInput("");
  const logIn = useLogIn();
  const { email } = route.params;
  const [loading, setLoading] = useState(false);
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      secret: confirmInput.value,
      email: email,
    },
  });
  const handleConfirm = async () => {
    const { value } = confirmInput;
    if (value === "" || !value.includes(" ")) {
      return Alert.alert("Invalid secret");
    }
    try {
      setLoading(true);
      const {
        data: { confirmSecret },
      } = await confirmSecretMutation();
      if (confirmSecret !== "" || confirmSecret !== false) {
        logIn(confirmSecret);
      } else {
        Alert.alert("Wrong secret!");
      }
    } catch (e) {
      Alert.alert("Can't confirm secret");
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...confirmInput}
          placeholder="Secret"
          returnKeyType="send"
          onSubmitEditing={handleConfirm}
          autoCorrect={false}
        />
        <AuthButton text="Confirm" onPress={handleConfirm} loading={loading} />
      </View>
    </TouchableWithoutFeedback>
  );
};
