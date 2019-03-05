import React, { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { darkBlueSecondary, mobileWidth } from "@edulastic/colors";
import { Affix } from "antd";

const HeaderWrapper = ({ children }) => (
  <HeaderContainer>
    <Affix className="fixed-header" style={{ position: "fixed", top: 0, right: 0 }}>
      <Container>{children}</Container>
    </Affix>
  </HeaderContainer>
);

HeaderWrapper.propTypes = {
  children: PropTypes.array.isRequired
};

export default memo(HeaderWrapper);

const HeaderContainer = styled.div`
  padding-top: 62px;
  margin-bottom: 10px;
`;

const Container = styled.div`
  height: 62px;
  padding: 0px 15px;
  background: ${darkBlueSecondary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${mobileWidth}) {
    flex-direction: column;
    height: 100px;
  }
`;
