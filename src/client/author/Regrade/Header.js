import React from "react";
import HeaderWrapper from "../src/mainContent/headerWrapper";
import { Title, ApplyButton } from "./styled";

const Header = () => {
  return (
    <HeaderWrapper>
      <Title>Regrade</Title> <ApplyButton>Apply</ApplyButton>
    </HeaderWrapper>
  );
};

export default Header;
