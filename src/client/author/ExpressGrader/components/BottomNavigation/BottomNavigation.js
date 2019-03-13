import React from "react";
import PropTypes from "prop-types";

import { Icon } from "antd";
import {
  Link,
  CloseModal,
  LinksWrapper,
  NavigationWrapper,
  StyledText,
  StyledTextInfo,
  CloseModalText
} from "./styled";

const BottomNavigation = ({ prevStudent, nextStudent, prevQuestion, nextQuestion, hideModal }) => (
  <NavigationWrapper>
    <StyledTextInfo>
      <Icon type="info-circle" />
      <StyledText>USE THE KEYBOARDS ARROW TO NAVIGATE BETWEEN THE SCREENS</StyledText>
    </StyledTextInfo>
    <LinksWrapper>
      <Link onClick={prevStudent}>
        <Icon type="up" />
        <StyledText>PREV STUDENT</StyledText>
      </Link>
      <Link onClick={nextStudent}>
        <Icon type="down" />
        <StyledText>NEXT STUDENT</StyledText>
      </Link>
      <Link onClick={prevQuestion}>
        <Icon type="left" />
        <StyledText>PREV QUESTION</StyledText>
      </Link>
      <Link onClick={nextQuestion}>
        <StyledText>NEXT QUESTION</StyledText>
        <Icon type="right" />
      </Link>
      <CloseModal onClick={hideModal}>
        <Icon type="close" width={5} height={5} />
        <CloseModalText>EXIT</CloseModalText>
      </CloseModal>
    </LinksWrapper>
  </NavigationWrapper>
);

BottomNavigation.propTypes = {
  prevStudent: PropTypes.func.isRequired,
  nextStudent: PropTypes.func.isRequired,
  prevQuestion: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired
};

export default BottomNavigation;
