import React from "react";
import { Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";
import PropTypes from "prop-types";
import constants from "../screens/constants";

const SquarePhoto = ({ vod = "", id, navigation }) => {
  const thumbnail = `http://img.youtube.com/vi/${vod.substr(32, 11)}/0.jpg`;

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Detail", { id: id })}>
      <Image
        key={{ id }}
        source={{ uri: thumbnail }}
        style={{ width: constants.width / 3, height: constants.height / 6 }}
      />
    </TouchableOpacity>
  );
};

SquarePhoto.propTypes = {
  vod: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default SquarePhoto;
