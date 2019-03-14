import React from "react";
import { Select } from "antd";
import { FlexContainer } from "@edulastic/common";
import { Container, StyledSelect, StyledClassID } from "./styled";

const ClassSelect = ({ classname, classid }) => (
  <FlexContainer>
    <Container>
      <StyledSelect defaultValue="">
        {classname.map(({ name }) => (
          <Select.Option value="">
            {classid.length > 0 && <StyledClassID>{classid}</StyledClassID>}
            {name}
          </Select.Option>
        ))}
      </StyledSelect>
    </Container>
  </FlexContainer>
);

export default ClassSelect;
