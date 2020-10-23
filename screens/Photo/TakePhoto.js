import React, { useEffect, useState } from "react";
import { Platform, TouchableOpacity } from "react-native";
import styled from "styled-components";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";
import Loader from "../../components/Loader";
import constants from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { color } from "react-native-reanimated";
import styles from "../../styles";

const View = styled.View`
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);

      if (status === "granted") {
        setHasPermission(true);
      }
    } catch (e) {
      console.log(e);
      hasPermission(false);
    } finally {
      setLoading(false);
    }
  };

  const toggleType = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : hasPermission ? (
        <Camera
          type={cameraType}
          style={{
            justifyContent: "flex-end",
            padding: 10,
            width: constants.width,
            height: constants.height / 2,
          }}
        >
          <TouchableOpacity onPress={toggleType}>
            {/* <View> */}
            <Ionicons
              name={Platform.OS === "ios" ? "ios-reverse-camera" : "md-reverse-camera"}
              size={28}
              color={styles.blackColor}
            />
            {/* </View> */}
          </TouchableOpacity>
        </Camera>
      ) : null}
    </View>
  );
};
