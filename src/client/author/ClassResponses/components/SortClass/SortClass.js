import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import { FlexContainer } from "@edulastic/common";
import { Container, StyledSelect } from "./styled";

const SortBar = ({ classname }) => (
  <FlexContainer>
    <Container>
      <StyledSelect defaultValue="">
        <Select.Option value="">{classname}</Select.Option>
      </StyledSelect>
    </Container>
  </FlexContainer>
);

SortBar.propTypes = {
  onSortChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  onStyleChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  activeStyle: PropTypes.string.isRequired
};

export default SortBar;
