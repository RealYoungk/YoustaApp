import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Image } from "react-native";
import Swiper from "react-native-swiper";
import constants from "../screens/constants";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View``;

const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;

const Touchable = styled.TouchableOpacity``;

const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;

const Bold = styled.Text`
  font-weight: 500;
`;

const Location = styled.Text`
  font-size: 12px;
`;

const IconsContainer = styled.View`
  margin-bottom: 5px;
  flex-direction: row;
`;
const IconContainer = styled.View`
  margin-right: 10px;
`;

const InfoContainer = styled.View`
  padding: 10px;
`;

const Caption = styled.Text`
  margin: 3px 0px;
`;

const CommentCount = styled.Text`
  opacity: 0.5;
  font-size: 12px;
`;

const Post = ({ user, location, vod, id, likeCount, caption, comments = [] }) => {
  const thumbnail = `http://img.youtube.com/vi/${vod.substr(32, 11)}/0.jpg`;

  return (
    <Container>
      <Header>
        <Touchable>
          <Image
            style={{ height: 40, width: 40, borderRadius: 20 }}
            source={{ uri: user.avatar }}
          />
        </Touchable>
        <HeaderUserContainer>
          <Touchable>
            <Bold>{user.username}</Bold>
            <Location>{location ? location : "no location"}</Location>
          </Touchable>
        </HeaderUserContainer>
      </Header>

      <Image
        key={{ id }}
        style={{ width: constants.width, height: constants.height / 3.5 }}
        source={{ uri: thumbnail }}
      />
      <InfoContainer>
        <IconsContainer>
          <Touchable>
            <IconContainer>
              <Ionicons
                size={28}
                name={Platform.OS === "ios" ? "ios-heart-empty" : "md-heart-empty"}
              />
            </IconContainer>
          </Touchable>
          <Touchable>
            <IconContainer>
              <Ionicons
                size={28}
                name={Platform.OS === "ios" ? "ios-chatbubbles" : "md-chatbubbles"}
              />
            </IconContainer>
          </Touchable>
        </IconsContainer>

        <Touchable>
          <Bold>{likeCount === 1 ? `1 like` : `${likeCount} likes`}</Bold>
        </Touchable>
        <Caption>
          <Bold>{user.username}</Bold>
          {caption}
        </Caption>
        <Touchable>
          <CommentCount>See all {comments.length} comments</CommentCount>
        </Touchable>
      </InfoContainer>
    </Container>
  );
};

Post.propTypes = {
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
};

export default Post;
