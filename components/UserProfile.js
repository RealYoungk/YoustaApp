import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Header } from "react-native/Libraries/NewAppScreen";
import { Image, Platform, Text, View } from "react-native";
import styles from "../styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import constants from "../screens/constants";
import Post from "./Post";
import SquarePhoto from "./SquarePhoto";

const ProfileHeader = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const HeaderColumn = styled.View``;

const ProfileStats = styled.View`
  flex-direction: row;
`;

const Stat = styled.View`
  align-items: center;
  margin-left: 40px;
`;

const Bold = styled.Text`
  font-weight: 600;
`;
const Bio = styled.Text`
  margin-left: 10px;
`;

const StatName = styled.Text`
  margin-top: 5px;
  font-size: 12px;
  color: ${styles.darkGreyColor};
`;

const ProfileMeta = styled.Text`
  margin-top: 10px;
  padding: 20px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 30px;
  padding: 10px;
  border: solid 1px ${styles.lightGreyColor};
  /* justify-content: space-around; */
  /* align-items: center; */
`;

const Button = styled.View`
  width: ${constants.width / 2};
  align-items: center;
`;

const PostContainer = styled.View`
  flex-direction: row;
`;

const UserProfile = ({
  avatar,
  postsCount,
  followersCount,
  followingCount,
  bio,
  fullName,
  posts,

  navigation,
}) => {
  //   console.log(avatar);
  const [isGrid, setIsGrid] = useState(true);
  const toggleGrid = () => setIsGrid((i) => !i);
  return (
    <View>
      <ProfileHeader>
        <Image style={{ height: 80, width: 80, borderRadius: 40 }} source={{ uri: avatar }} />
        <HeaderColumn>
          <ProfileStats>
            <Stat>
              <Bold>{postsCount}</Bold>
              <StatName>Posts</StatName>
            </Stat>
            <Stat>
              <Bold>{followersCount}</Bold>
              <StatName>Followers</StatName>
            </Stat>
            <Stat>
              <Bold>{followingCount}</Bold>
              <StatName>Following</StatName>
            </Stat>
          </ProfileStats>
        </HeaderColumn>
      </ProfileHeader>
      <ProfileMeta>
        <Bold>{fullName}</Bold>
        {"  "}
        <Bio>{bio}</Bio>
      </ProfileMeta>
      <ButtonContainer>
        <TouchableOpacity onPress={toggleGrid}>
          <Button>
            <Ionicons
              color={isGrid ? styles.darkGreyColor : styles.lightGreyColor}
              size={32}
              name={Platform.OS === "ios" ? "ios-grid" : "md-grid"}
            />
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleGrid}>
          <Button>
            <Ionicons
              color={isGrid ? styles.lightGreyColor : styles.darkBlueColor}
              size={32}
              name={Platform.OS === "ios" ? "ios-list" : "md-list"}
            />
          </Button>
        </TouchableOpacity>
      </ButtonContainer>
      <PostContainer>
        {posts &&
          posts.map((post) =>
            isGrid ? (
              <SquarePhoto key={post.id} {...post} navigation={navigation} />
            ) : (
              <Post key={post.id} {...post} navigation={navigation} />
            )
          )}
      </PostContainer>
    </View>
  );
};

UserProfile.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  isSelf: PropTypes.bool.isRequired,
  bio: PropTypes.string.isRequired,
  followingCount: PropTypes.number.isRequired,
  followersCount: PropTypes.number.isRequired,
  postsCount: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired,
      }).isRequired,
      vod: PropTypes.string.isRequired,
      likeCount: PropTypes.number.isRequired,
      isLiked: PropTypes.bool.isRequired,
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
          user: PropTypes.shape({
            id: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
          }).isRequired,
        })
      ).isRequired,
      caption: PropTypes.string.isRequired,
      location: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
    })
  ),
};

export default UserProfile;
