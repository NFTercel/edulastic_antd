import React from "react";
import styled from "styled-components";
import { Button } from "antd";

// components
import HeaderWrapper from "../../src/mainContent/headerWrapper";

const Header = () => {
  return (
    <HeaderWrapper>
      <Title> Manage Class</Title>

      <Button> Start Sync </Button>
      <Button> Sync with Google Classroom</Button>
      <Button> Create Class </Button>
    </HeaderWrapper>
  );
};

const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
  line-height: 1.36;
  text-align: left;
  display: flex;
`;

export default Header;
