import React, { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { withNamespaces } from "@edulastic/localization";
import { compose } from "redux";

import HeaderWrapper from "./headerWrapper";
import ClassSelect from "../ClassSelector";
import ShowActiveClass from "../ShowActiveClasses";

const Header = ({ t, titleText, classSelect = true, showActiveClass = false }) => (
  <HeaderWrapper>
    <Wrapper>
      <AssignmentTitle>{t(titleText)}</AssignmentTitle>
      {classSelect && <ClassSelect t={t} />}
      {showActiveClass && <ShowActiveClass t={t} />}
    </Wrapper>
  </HeaderWrapper>
);

Header.propTypes = {
  t: PropTypes.func.isRequired,
  titleText: PropTypes.string.isRequired,
  classSelect: PropTypes.bool.isRequired,
  showActiveClass: PropTypes.bool.isRequired
};

const enhance = compose(
  memo,
  withNamespaces("header")
);

export default enhance(Header);

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  font-size: 17px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const AssignmentTitle = styled.div`
  font-family: Open Sans;
  font-size: ${props => props.theme.headerTitleFontSize};
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.36;
  letter-spacing: normal;
  text-align: left;
  color: ${props => props.theme.headerTitleTextColor};
  @media screen and (max-width: 768px) {
    padding-left: 40px;
  }
`;
