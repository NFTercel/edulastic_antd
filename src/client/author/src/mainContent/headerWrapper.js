import React, { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { lightBlueSecondary, mobileWidth } from "@edulastic/colors";
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
  padding-top: 96px;
  margin-bottom: 28px;

  @media (max-width: ${mobileWidth}) {
    padding-top: 62px;
    margin-bottom: 33px;
  }
`;

const Container = styled.div`
  height: 96px;
  padding: 0 44px;
  background: ${lightBlueSecondary};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${mobileWidth}) {
    height: 61px;
    padding: 0 26px;
  }
`;
