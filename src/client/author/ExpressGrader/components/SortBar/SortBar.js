import React from "react";
import PropTypes from "prop-types";
import { FlexContainer } from "@edulastic/common";
import { Radio } from "antd";
import { Container, StyledRadio, StyledFlexContainer } from "./styled";

const RadioGroup = Radio.Group;

const SortBar = ({ changeViewType, viewType }) => (
  <FlexContainer>
    <Container>
      <StyledFlexContainer>
        <RadioGroup onChange={changeViewType} value={viewType}>
          <StyledRadio value="view">View Mode</StyledRadio>
          <StyledRadio value="score">Score Entry</StyledRadio>
          <StyledRadio value="response">Response Entry</StyledRadio>
        </RadioGroup>
      </StyledFlexContainer>
    </Container>
  </FlexContainer>
);

SortBar.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  onStyleChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  activeStyle: PropTypes.string.isRequired
};

export default SortBar;
