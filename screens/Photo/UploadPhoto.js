import { NavigationRouteContext } from "@react-navigation/native";
import React from "react";
import styled from "styled-components";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  return (
    <View>
      <Text>Upload Photo</Text>
    </View>
  );
};
