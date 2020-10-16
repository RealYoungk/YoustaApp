import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { RefreshControl, ScrollView } from "react-native";
import PropTypes from "prop-types";

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

const SearchPresenter = ({ term, shouldFetch }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(SEARCH, {
    variables: {
      term,
    },
    skip: !shouldFetch,
  });
  console.log(data, loading);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch({ variables: { term } });
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
    ></ScrollView>
  );
};

SearchPresenter.propTypes = {
  term: PropTypes.string.isRequired,
  shouldFetch: PropTypes.bool.isRequired,
};

export default SearchPresenter;
