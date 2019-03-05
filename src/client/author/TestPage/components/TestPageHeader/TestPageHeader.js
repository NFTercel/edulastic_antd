import React, { memo } from "react";
import PropTypes from "prop-types";
import { white } from "@edulastic/colors";
import { compose } from "redux";
import { connect } from "react-redux";
import { FlexContainer, EduButton } from "@edulastic/common";
import { IconAddItems, IconAssign, IconReview, IconSettings, IconSummary } from "@edulastic/icons";
import { Container, ShareIcon, Title, MenuIcon, MenuIconWrapper } from "./styled";

import TestPageNav from "../TestPageNav/TestPageNav";
import HeaderWrapper from "../../../src/mainContent/headerWrapper";

import { toggleSideBarAction } from "../../../src/actions/togglemenu";

export const navButtons = [
  {
    icon: <IconSummary color={white} width={16} height={16} />,
    value: "summary",
    text: "Summary"
  },
  {
    icon: <IconAddItems color={white} width={16} height={16} />,
    value: "addItems",
    text: "Add Items"
  },
  {
    icon: <IconReview color={white} width={24} height={24} />,
    value: "review",
    text: "Review"
  },
  {
    icon: <IconSettings color={white} width={16} height={16} />,
    value: "settings",
    text: "Settings"
  },
  {
    icon: <IconAssign color={white} width={16} height={16} />,
    value: "assign",
    text: "ASSIGN"
  }
];
// TODO mobile look
const TestPageHeader = ({ onChangeNav, current, onSave, title, creating, onShare, windowWidth, toggleSideBar }) =>
  windowWidth > 993 ? (
    <HeaderWrapper>
      <Title>{title}</Title>

      <TestPageNav onChange={onChangeNav} current={current} buttons={navButtons} />

      <FlexContainer justifyContent="space-between">
        <EduButton style={{ width: 120 }} size="large" onClick={onShare}>
          Share
        </EduButton>
        <EduButton style={{ width: 120 }} disabled={creating} size="large" type="secondary" onClick={onSave}>
          {creating ? "Saving..." : "Save changes"}
        </EduButton>
      </FlexContainer>
    </HeaderWrapper>
  ) : (
    <Container>
      <FlexContainer
        flexDirection="column"
        style={{
          width: "100%",
          justifyContent: "space-between",
          height: "100px"
        }}
      >
        <FlexContainer
          style={{
            width: "100%",
            justifyContent: "space-between",
            padding: "20px 25px 5px 25px",
            marginBottom: "10px"
          }}
        >
          {" "}
          <MenuIconWrapper>
            <MenuIcon type="bars" onClick={toggleSideBar} />
            <Title>{title}</Title>
          </MenuIconWrapper>
          <FlexContainer justifyContent="space-between">
            <EduButton size="large" onClick={onShare}>
              <ShareIcon />
            </EduButton>
            <EduButton style={{ width: 80 }} disabled={creating} size="large" type="secondary" onClick={onSave}>
              {creating ? "Saving..." : "Save"}
            </EduButton>
          </FlexContainer>
        </FlexContainer>
        <TestPageNav onChange={onChangeNav} current={current} buttons={navButtons} />
      </FlexContainer>
    </Container>
  );

TestPageHeader.propTypes = {
  onChangeNav: PropTypes.func.isRequired,
  toggleSideBar: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  current: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  creating: PropTypes.bool.isRequired,
  onShare: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired
};

const enhance = compose(
  memo,
  connect(
    null,
    { toggleSideBar: toggleSideBarAction }
  )
);
export default enhance(TestPageHeader);
