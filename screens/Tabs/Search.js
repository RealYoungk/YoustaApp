import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../components/Loader";

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
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(SEARCH, {
    variables: {
      term: term,
    },
    skip: !shouldFetch,
  });
  const onChange = (text) => {
    setTerm(text);
    setShouldFetch(false);
  };
  const onSubmit = () => {
    // console.log("Submit");
    setShouldFetch(true);
    setRefreshing(true);
  };

  // const onRefresh = () => {
  //   setShouldFetch(false);
  // };
  useEffect(() => {
    const handleData = async () => {
      try {
        await refetch();
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    if (refreshing) {
      handleData();
      setRefreshing(false);
    }
  }, [shouldFetch]);

  navigation.setOptions({
    headerTitle: () => (
      <SearchBar onChange={onChange} value={term} onSubmit={onSubmit} shouldFetch={shouldFetch} />
    ),
  });

  return <ScrollView>{loading ? <Loader /> : null}</ScrollView>;
};
