import React from "react";
import { IconPlus } from "@edulastic/icons";
import { white } from "@edulastic/colors";
import { EduButton, FlexContainer } from "@edulastic/common";

const AddAssignmentButton = ({ onClick }) => (
  <EduButton onClick={onClick} type="secondary" size="large" style={{ height: 32 }}>
    <FlexContainer>
      <IconPlus color={white} width={14} height={14} />
      <span>Add new assignment</span>
    </FlexContainer>
  </EduButton>
);

export default AddAssignmentButton;
