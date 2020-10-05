import React from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: white;
`;

const Text = styled.Text``;

export default () => {
  const emailInput = useInput("");
  const handleLogin = () => {
    // const
  };
  return (
    <View>
      <AuthInput {...useInput} placeholder="Email" keyboardType="eamil-address" />
      <AuthButton text="Log in" onPress={() => null} />
    </View>
  );
};
