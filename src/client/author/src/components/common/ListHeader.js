import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withNamespaces } from "@edulastic/localization";
import { FlexContainer, Button } from "@edulastic/common";
import { tabletWidth, darkBlueSecondary, white, lightBlueSecondary, newBlue } from "@edulastic/colors";
import { IconPlusCircle, IconMenuOpenClose } from "@edulastic/icons";
import { connect } from "react-redux";
import HeaderWrapper from "../../mainContent/headerWrapper";
import { toggleSideBarAction } from "../../actions/togglemenu";

const toggleMenu = toggle => {
  toggle();
};

const ListHeader = ({ onCreate, t, title, btnTitle, toggleSideBar }) => (
  <Container>
    <FlexContainer>
      <MenuIcon onClick={() => toggleMenu(toggleSideBar)} />
      <Title>{title}</Title>
    </FlexContainer>

    <CreateButton
      onClick={onCreate}
      color="secondary"
      variant="create"
      shadow="none"
      icon={<IconPlusStyled color={newBlue} left={-40} width={20} height={20} hoverColor={newBlue} />}
    >
      {btnTitle && btnTitle.length ? btnTitle : t("component.itemlist.header.create")}
    </CreateButton>
  </Container>
);
ListHeader.propTypes = {
  onCreate: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  toggleSideBar: PropTypes.func.isRequired,
  btnTitle: PropTypes.string.isRequired
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

    svg {
      position: static;
    }
  }
`;

const IconPlusStyled = styled(IconPlusCircle)`
  position: relative;
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
