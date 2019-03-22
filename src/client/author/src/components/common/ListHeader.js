import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { compose } from "redux";
import { Icon } from "antd";
import { connect } from "react-redux";

import { IconPlus, IconMenuOpenClose } from "@edulastic/icons";
import { FlexContainer, Button } from "@edulastic/common";
import { tabletWidth, darkBlueSecondary, white, lightBlueSecondary } from "@edulastic/colors";
import { withNamespaces } from "@edulastic/localization";

import { toggleSideBarAction } from "../../actions/togglemenu";
import HeaderWrapper from "../../mainContent/headerWrapper";

const toggleMenu = toggle => {
  toggle();
};

const ListHeader = ({ onCreate, t, title, btnTitle, toggleSideBar }) => {
  return (
    <Container>
      <FlexContainer>
        <MenuIcon onClick={() => toggleMenu(toggleSideBar)} />
        <Title>{title}</Title>
      </FlexContainer>

      <CreateButton
        onClick={onCreate}
        color="success"
        icon={<IconPlusStyled color={white} left={-10} width={13} height={13} hoverColor={white} />}
      >
        {btnTitle ? btnTitle : t("component.itemlist.header.create")}
      </CreateButton>
    </Container>
  );
};
ListHeader.propTypes = {
  onCreate: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  toggleSideBar: PropTypes.func.isRequired
};

const enhance = compose(
  withNamespaces("author"),
  connect(
    ({ authorUi, user }) => ({
      isSidebarCollapsed: authorUi.isSidebarCollapsed,
      firstName: user.firstName || ""
    }),
    { toggleSideBar: toggleSideBarAction }
  )
);
export default enhance(ListHeader);

const Container = styled(HeaderWrapper)`
  display: flex;
  border-radius: 5px;
  align-items: center;
  justify-content: space-between;
  background-color: ${darkBlueSecondary};
  padding: 0px 15px;
  height: 62px;
  z-index: 1;
`;

const CreateButton = styled(Button)`
  position: relative;
  width: 194px;
  height: 45px;
  padding-left: 44px !important;
  color: ${lightBlueSecondary} !important;
  border-radius: 3px !important;
  background: ${white} !important;
  margin: 0;

  @media (max-width: ${tabletWidth}) {
    width: 45px;
    height: 40px;
    padding: 0 !important;
    min-width: 0 !important;

    span {
      display: none;
    }
  }
`;

const IconPlusStyled = styled(IconPlus)`
  position: absolute;
  top: 12px;
  left: 18px;
  background: ${lightBlueSecondary};
  border-radius: 20px;
  padding: 4px;
  width: 20px;
  height: 20px;

  rect {
    fill: ${white};
  }

  @media (max-width: ${tabletWidth}) {
    position: unset;
  }
`;

export const Title = styled.h1`
  color: ${white};
  font-size: 22px;
  font-weight: bold;
  margin: 0;
  padding: 0;
`;

const MenuIcon = styled(IconMenuOpenClose)`
  display: none;
  fill: ${white};
  width: 18px;
  margin-right: 25px !important;

  @media (max-width: ${tabletWidth}) {
    display: block;
  }
`;
