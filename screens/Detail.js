import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";

export default ({ navigation, route }) => {
  return (
    <View>
      <Text>I should fetch for:{route.params.id} </Text>
    </View>
  );
};
