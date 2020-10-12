import React from "react";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import styles from "../styles.js";

const NavIcon = ({ name, color = styles.blackColor, size = 26 }) => (
  <Ionicons name={name} color={color} size={size} />
);

NavIcon.PropTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
};

export default NavIcon;
