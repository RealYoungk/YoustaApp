import React from "react";
// import { Text, View } from "react-native";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../fragments";
import Loader from "../components/Loader";
import Post from "../components/Post";
import UserProfile from "../components/UserProfile";
import { ScrollView } from "react-native-gesture-handler";

const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

const View = styled.View``;
const Text = styled.Text``;

export default ({ navigation, route }) => {
  const { loading, data } = useQuery(GET_USER, { variables: { username: route.params.username } });
  // console.log(loading, data);
  return (
    <ScrollView>
      {loading ? <Loader /> : data && data.seeUser && <UserProfile {...data.seeUser} />}
    </ScrollView>
  );
};
