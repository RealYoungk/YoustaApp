import React, { useState } from "react";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation, route }) => {
  const [term, setTerm] = useState("");
  const onChange = (text) => {
    setTerm(text);
  };
  const onSubmit = () => {};

  navigation.setOptions({
    headerTitle: () => <SearchBar onChange={onChange} value={term} onSubmit={onSubmit} />,
  });

  return (
    <View>
      <Text>Search</Text>
    </View>
  );
};
