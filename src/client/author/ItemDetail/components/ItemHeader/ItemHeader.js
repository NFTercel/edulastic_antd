import React from "react";
import PropTypes from "prop-types";
import { IconChevronLeft } from "@edulastic/icons";
import { FlexContainer } from "@edulastic/common";
import { white } from "@edulastic/colors";
import HeaderWrapper from "../../../src/mainContent/headerWrapper";
import { MAX_MOBILE_WIDTH } from "../../../src/constants/others";
import {
  Container,
  Title,
  Back,
  LeftSide,
  MobileContainer,
  ReferenceText,
  ReferenceValue,
  RightSide
} from "./styled";

const ItemHeader = ({ title, children, link, reference, windowWidth }) => {
  const width = windowWidth;
  const renderLeftSide = () => (
    <LeftSide>
      <Title>{title}</Title>
      {reference && (
        <FlexContainer>
          <ReferenceText>Reference</ReferenceText>
          <ReferenceValue>{reference}</ReferenceValue>
        </FlexContainer>
      )}
    </LeftSide>
  );

  const renderIcon = () => {
    if (link) {
      return (
        <Back to={link.url}>
          <IconChevronLeft color={white} width={10} height={10} /> {link.text}
        </Back>
      );
    }
  };

  return width > MAX_MOBILE_WIDTH ? (
    <HeaderWrapper>
      <FlexContainer alignItems="center" style={{ flex: 1 }}>
        {renderLeftSide()}
        <RightSide>{children}</RightSide>
      </FlexContainer>
      <LeftSide>{renderIcon()}</LeftSide>
    </HeaderWrapper>
  ) : (
    <MobileContainer>
      <Container>
        <FlexContainer
          alignItems="center"
          style={{ flex: 1, paddingBottom: 20, flexDirection: "column" }}
        >
          {renderLeftSide()}
        </FlexContainer>
        <RightSide>{children}</RightSide>
        <LeftSide>{renderIcon()}</LeftSide>
      </Container>
    </MobileContainer>
  );
};

ItemHeader.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  link: PropTypes.any,
  windowWidth: PropTypes.number.isRequired,
  reference: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

ItemHeader.defaultProps = {
  children: null,
  title: "",
  link: null,
  reference: null
};

export default ItemHeader;
