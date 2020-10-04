import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";

const Container = styled.TouchableOpacity``;
const Text = styled.Text``;

export default () => {
  const navigation = useNavigation();
  return (
    <Container onPress={() => navigation.navigate("MessageNavigation")}>
      <Text>Messages</Text>
    </Container>
  );
};
