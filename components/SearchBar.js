import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "react-native";
import styles from "../styles";
import constants from "../screens/constants";

const SearchBar = ({ onChange, value, onSubmit }) => (
  <TextInput
    style={{
      width: constants.width - 40,
      height: 35,
      backgroundColor: styles.lightGreyColor,
      padding: 10,
      borderRadius: 5,
      textAlign: "center",
    }}
    value={value}
    placeholder="Search"
    onEndEditing={onSubmit}
    onChangeText={onChange}
    returnKeyType="search"
    placeholderTextColor={`${styles.darkGreyColor}`}
  />
);

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
