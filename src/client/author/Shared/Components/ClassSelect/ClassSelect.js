import React from "react";
import { Select } from "antd";
import { FlexContainer } from "@edulastic/common";
import { Container, StyledSelect, StyledClassID } from "./styled";

// eslint-disable-next-line react/prop-types
const ClassSelect = ({ classname, selected, handleChange, classid = "", justifyContent }) => {
  if (classname.length === 0) {
    return null;
  }
  const selectedValue = selected < classname.length ? selected : 0;
  return (
    <FlexContainer justifyContent={justifyContent}>
      <Container>
        <StyledSelect value={selectedValue} onChange={handleChange}>
          {classname.map(({ name }, index) => (
            <Select.Option value={index} key={index}>
              {/* {classid.length > 0 && <StyledClassID>{classid}</StyledClassID>} */}
              {name}
            </Select.Option>
          ))}
        </StyledSelect>
      </Container>
    </FlexContainer>
  );
};

export default ClassSelect;
