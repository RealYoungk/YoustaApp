import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Header } from "react-native/Libraries/NewAppScreen";
import { Image, Platform, View } from "react-native";
import styles from "../styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import constants from "../screens/constants";

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
  /* justify-content: space-around; */
  /* align-items: center; */
`;

const Button = styled.View`
  width: ${constants.width / 2};
  align-items: center;
`;

const UserProfile = (data) => {
  const { avatar, postsCount, followersCount, followingCount, bio, fullName } = data;
  //   console.log(avatar);
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
        {bio}
      </ProfileMeta>
      <ButtonContainer>
        <TouchableOpacity>
          <Button>
            <Ionicons size={32} name={Platform.OS === "ios" ? "ios-grid" : "md-grid"} />
          </Button>
        </TouchableOpacity>
        <TouchableOpacity>
          <Button>
            <Ionicons size={32} name={Platform.OS === "ios" ? "ios-list" : "md-list"} />
          </Button>
        </TouchableOpacity>
      </ButtonContainer>
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
