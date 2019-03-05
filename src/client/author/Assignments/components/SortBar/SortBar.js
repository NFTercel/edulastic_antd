import React from "react";
import { Select } from "antd";
import { Container, StyledSelect, DFlexContainer } from "./styled";

const SortBar = ({ onSortChange, activeStyle, onStyleChange }) => (
  <DFlexContainer>
    <Container>
      <StyledSelect defaultValue="" onChange={onSortChange}>
        <Select.Option value="">Date</Select.Option>
        <Select.Option value="relevance">Name</Select.Option>
      </StyledSelect>
    </Container>
  </DFlexContainer>
);

export default SortBar;
