import { gql } from "apollo-boost";
import React, { useEffect } from "react";
import { useQuery } from "react-apollo-hooks";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components";
import Loader from "../../components/Loader";
import UserProfile from "../../components/UserProfile";
import { USER_FRAGMENT } from "../../fragments";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default ({ navigation, route }) => {
  const { loading, data } = useQuery(ME);
  // console.log(data);
  // useEffect(() => {
  //   if (data.me) {
  //     navigation.setParams({ title: data.me.username });
  //   }
  // }, [data]);
  return (
    <ScrollView>
      {loading ? <Loader /> : data && data.me && <UserProfile {...data.me} />}
    </ScrollView>
  );
};
