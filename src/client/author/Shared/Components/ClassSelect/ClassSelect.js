import React from "react";
import { Select } from "antd";
import { FlexContainer } from "@edulastic/common";
import { Container, StyledSelect } from "./styled";

const ClassSelect = ({ classname }) => (
  <FlexContainer>
    <Container>
      <StyledSelect defaultValue="">
        {classname.map(({ name }) => (
          <Select.Option value="">{name}</Select.Option>
        ))}
      </StyledSelect>
    </Container>
  </FlexContainer>
);

export default ClassSelect;
