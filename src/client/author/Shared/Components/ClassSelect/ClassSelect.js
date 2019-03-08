import React from "react";
import { Select } from "antd";
import { FlexContainer } from "@edulastic/common";
import { Container, StyledSelect } from "./styled";

const ClassSort = ({ classname }) => (
  <FlexContainer>
    <Container>
      <StyledSelect defaultValue="">
        <Select.Option value="">{classname}</Select.Option>
      </StyledSelect>
    </Container>
  </FlexContainer>
);

export default ClassSort;
