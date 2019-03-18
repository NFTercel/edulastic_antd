import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { compose } from "redux";
import { Button } from "@edulastic/common";
import { IconPlus } from "@edulastic/icons";
import { Icon } from "antd";
import { connect } from "react-redux";
import { FlexContainer } from "@edulastic/common";
import { toggleSideBarAction } from "../../actions/togglemenu";
import { tabletWidth, greenDarkSecondary, darkBlueSecondary, white } from "@edulastic/colors";
import { withNamespaces } from "@edulastic/localization";
import HeaderWrapper from "../../mainContent/headerWrapper";

const toggleMenu = toggle => {
  toggle();
};

const ListHeader = ({ onCreate, t, title, btnTitle, toggleSideBar }) => {
  return (
    <Container>
      <FlexContainer>
        <MenuIcon type="bars" onClick={() => toggleMenu(toggleSideBar)} />
        <Title>{title}</Title>
      </FlexContainer>

      <CreateButton
        // disabled={creating}
        onClick={onCreate}
        color="success"
        icon={<IconPlusStyled color={greenDarkSecondary} left={-10} width={13} height={13} hoverColor={white} />}
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
  height: 50px;
  min-width: 151;
  color: ${white};
  border-radius: 5;
  margin: 0;
  @media (max-width: ${tabletWidth}) {
    height: 40px;
  }
`;

const IconPlusStyled = styled(IconPlus)`
  position: relative;
`;

// const HeaderWrapper = styled.div`
//   padding-top: 62px;
//   margin-bottom: 10px;
// `;
export const Title = styled.h1`
  color: ${white};
  font-size: 22px;
  font-weight: bold;
  margin: 0;
  padding: 0;
`;
const MenuIcon = styled(Icon)`
  display: none;
  @media (max-width: ${tabletWidth}) {
    display: block;
    color: #fff;
    font-size: 18px;
  }
`;
