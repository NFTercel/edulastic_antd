import React from "react";
import HeaderWrapper from "../src/mainContent/headerWrapper";
import { Title, ApplyButton } from "./styled";

const Header = ({ onApplySettings }) => {
  return (
    <HeaderWrapper>
      <Title>Regrade</Title> <ApplyButton onClick={onApplySettings}>Apply</ApplyButton>
    </HeaderWrapper>
  );
};

export default Header;
