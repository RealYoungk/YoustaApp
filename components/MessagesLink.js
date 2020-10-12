import React from "react";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components";
import NavIcon from "./NavIcon";

const Container = styled.TouchableOpacity`
  padding-right: 20px;
`;
const Text = styled.Text``;

export default () => {
  const navigation = useNavigation();
  return (
    <Container onPress={() => navigation.navigate("MessageNavigation")}>
      <NavIcon name={Platform.OS === "ios" ? "ios-paper-plane" : "md-paper-plane"} />
    </Container>
  );
};
