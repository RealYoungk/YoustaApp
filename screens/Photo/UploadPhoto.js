import React, { useState } from "react";
import axios from "axios";
import { ActivityIndicator, Alert, Image } from "react-native";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import styles from "../../styles";
import constants from "../constants";
import Option from "../../apollo";

const Container = styled.View`
  padding: 20px;
  flex-direction: row;
`;

const Form = styled.View`
  justify-content: flex-start;
`;

const STextInput = styled.TextInput`
  margin-bottom: 10px;
  border: 0px solid ${styles.lightGreyColor};
  border-bottom-width: 1px;
  padding-bottom: 10px;
  width: ${constants.width - 180};
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.blueColor};
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

export default ({ navigation, route }) => {
  const [loading, setIsLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState("fileurl");
  const photo = route.params.photo;
  const captionInput = useInput("caption");
  const locationInput = useInput("location");
  const handleSubmit = async () => {
    if (captionInput.value === "" || locationInput.value === "") {
      Alert.alert("All fields are required");
    }
    const formData = new FormData();
    const name = photo.filename;
    const [, type] = name.split(".");
    formData.append("file", {
      name: photo.filename,
      type: "image/jpeg",
      uri: photo.uri,
    });
    try {
      const {
        data: { path },
      } = await axios.post(`${Option.uri}/api/upload`, formData, {
        headers: {
          "Content-type": "multipart/from-data",
        },
      });
      console.log(path);
    } catch (e) {
      Alert.alert("업로드 오류", "다시 시도하십시오");
    }
  };
  return (
    <Container>
      <Image source={{ uri: photo.uri }} style={{ height: 80, width: 80, marginRight: 30 }} />
      <Form>
        <STextInput
          onChangeText={captionInput.onChange}
          value={captionInput.value}
          placeholder="Caption"
          multiline={true}
          placeholderTextColor={styles.darkGreyColor}
        />
        <STextInput
          onChangeText={locationInput.onChange}
          value={locationInput.value}
          placeholder="Location"
          multiline={true}
          placeholderTextColor={styles.darkGreyColor}
        />
        <Button onPress={handleSubmit}>
          {loading ? <ActivityIndicator color="white" /> : <Text>Upload </Text>}
        </Button>
      </Form>
    </Container>
  );
};
