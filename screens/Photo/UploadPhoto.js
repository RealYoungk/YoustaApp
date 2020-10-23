import { NavigationRouteContext } from "@react-navigation/native";
import React from "react";
import styled from "styled-components";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation, route }) => {
  console.log(route);
  return (
    <View>
      <Text>업로드 가능 {route.params.photo.uri}</Text>
    </View>
  );
};
