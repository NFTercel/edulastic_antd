import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Header, FlexContainer, HeaderLeftMenu, MobileMainMenu as Mobile, HeaderMainMenu } from "../common";
import { IconLogoCompact, IconSave, IconPause, IconLogout } from "@edulastic/icons";
import { IPAD_PORTRAIT_WIDTH } from "../../constants/others";
import { boxShadowDefault } from "@edulastic/colors";
import QuestionSelectDropdown from "../common/QuestionSelectDropdown";

import ProgressContainer from "./ProgressContainer";

const PlayerHeader = ({ title, dropdownOptions, currentItem, onOpenExitPopup, theme, gotoQuestion }) => {
  return (
    <Fragment>
      <HeaderPracticePlayer>
        <HeaderLeftMenu skinb={"true"}>
          <LogoCompact />
        </HeaderLeftMenu>
        <HeaderMainMenu skinb={"true"}>
          <FlexContainer>
            <PlayerTitle>{title}</PlayerTitle>
            <ProgressContainer questions={dropdownOptions} current={currentItem + 1} desktop={"true"} />
            <ContainerRight>
              <FlexDisplay>
                <Save>
                  <IconSave color={theme.headerIconColor} />
                </Save>
                <StyledLink to="/home/assignments">
                  <IconPause color={theme.headerIconColor} />
                </StyledLink>
                <Save onClick={onOpenExitPopup}>
                  <IconLogout color={theme.headerIconColor} />
                </Save>
              </FlexDisplay>
            </ContainerRight>
          </FlexContainer>
          <Mobile>
            <ProgressContainer questions={dropdownOptions} current={currentItem + 1} />
          </Mobile>
        </HeaderMainMenu>
      </HeaderPracticePlayer>
      <Mobile>
        <QuestionSelectDropdown
          key={currentItem}
          currentItem={currentItem}
          gotoQuestion={gotoQuestion}
          options={dropdownOptions}
          skinb={"true"}
        />
      </Mobile>
    </Fragment>
  );
};

export default PlayerHeader;

const LogoCompact = styled(IconLogoCompact)`
  width: 21px;
  height: 21px;
  margin: 10px;
  fill: ${props => props.theme.logoColor};
  &:hover {
    fill: ${props => props.theme.headerIconHoverColor};
  }
`;

const PlayerTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  @media (max-width: ${IPAD_PORTRAIT_WIDTH}px) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
const Save = styled.div`
  background: ${props => props.theme.headerIconBgColor};
  border-radius: 5px;
  padding: 12px 14px;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    svg {
      fill: ${props => props.theme.headerIconHoverColor};
    }
  }
`;

const StyledLink = styled(Link)`
  background: ${props => props.theme.headerIconBgColor};
  border-radius: 5px;
  padding: 12px 14px;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    svg {
      fill: ${props => props.theme.headerIconHoverColor};
    }
  }
`;

const FlexDisplay = styled.div`
  display: flex;
`;

const ContainerRight = styled.div`
  display: flex;
  margin-left: 40px;
  @media (max-width: ${IPAD_PORTRAIT_WIDTH}px) {
    margin-left: auto;
  }
`;

const HeaderPracticePlayer = styled(Header)`
  background: ${props => props.theme.headerBg};
  box-shadow: ${boxShadowDefault};
  height: 70px;
  @media (max-width: ${IPAD_PORTRAIT_WIDTH}px) {
    height: 104px;
  }
`;
