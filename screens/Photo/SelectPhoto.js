import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import Loader from "../../components/Loader";
import { Image, ScrollView } from "react-native";
import constants from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../../styles";

const View = styled.View`
  /* justify-content: center;
  align-items: center; */
  flex: 1;
`;

const Text = styled.Text``;

const Button = styled.TouchableOpacity`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: ${styles.lightGreyColor};
  width: 100px;
  height: 30px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [selected, setSelected] = useState();
  const [allPhotos, setAllPhotos] = useState();
  const changeSelected = (photo) => {
    setSelected(photo);
  };
  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync({
        sortBy: [[MediaLibrary.SortBy.default, false]],
      });
      const [firstPhoto] = assets;
      setSelected(firstPhoto);
      setAllPhotos(assets);
    } catch (e) {
      console.log(e);
    }
  };

  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status === "granted") {
        setHasPermission(true);
        await getPhotos();
      }
    } catch (e) {
      console.log(e);
      hasPermission(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSelected = () => {
    navigation.navigate("UploadPhoto", { photo: selected });
  };

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : hasPermission ? (
        <>
          <Image
            style={{ width: constants.width, height: constants.height / 2 }}
            source={{ uri: selected.uri }}
          />
          <Button onPress={handleSelected}>
            <Text>Selected Photo</Text>
          </Button>

          <ScrollView contentContainerStyle={{ flexDirection: "row" }}>
            {allPhotos.map((photo) => (
              <TouchableOpacity key={photo.id} onPress={() => changeSelected(photo)}>
                <Image
                  source={{ uri: photo.uri }}
                  style={{
                    width: constants.width / 3,
                    height: constants.height / 6,
                    opacity: photo.id === selected.id ? 0.5 : 1,
                  }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      ) : null}
    </View>
  );
};
