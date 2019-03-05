import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { white, blue, textColor } from "@edulastic/colors";
import SettingsBarIcon from "./SettingsBarIcon";

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

const Container = styled.div`
  background: ${({ selected }) => (selected ? blue : white)};
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.07);
  width: 45%;
  margin-bottom: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ selected }) => (selected ? white : textColor)};
`;

const Text = styled.div`
  margin-top: 10px;
`;
