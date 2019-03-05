import React from "react";
import PropTypes from "prop-types";
import { Container, Text } from "./styled";
import SettingsBarIcon from "../SettingsBarIcon/SettingsBarIcon";

const SettingsBarItem = ({ item, onSelect, selected }) => (
  <Container selected={selected} onClick={onSelect}>
    <SettingsBarIcon active={selected} type={item.value} />
    <Text>{item.text}</Text>
  </Container>
);

SettingsBarItem.propTypes = {
  item: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired
};

export default SettingsBarItem;
