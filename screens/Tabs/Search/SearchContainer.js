import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "../../../components/SearchBar";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../../components/Loader";
import SearchPresenter from "./SearchPresenter";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      id
      vod
      likeCount
      commentCount
    }
  }
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation, route }) => {
  const [term, setTerm] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const onChange = (text) => {
    setTerm(text);
    setShouldFetch(false);
  };

  const onSubmit = () => {
    setShouldFetch(true);
  };

  navigation.setOptions({
    headerTitle: () => <SearchBar onChange={onChange} value={term} onSubmit={onSubmit} />,
  });

  return <SearchPresenter term={term} shouldFetch={shouldFetch} navigation={navigation} />;
};
