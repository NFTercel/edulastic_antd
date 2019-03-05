import React from "react";
import PropTypes from "prop-types";
import { FlexContainer } from "@edulastic/common";
import Breadcrumb from "../../../src/components/Breadcrumb";
import { Container, Title } from "./styled";

const Header = ({ title }) => {
  const breadcrumbData = [
    {
      title: "ITEM LIST",
      to: "/author/items"
    },
    {
      title: "ITEM DETAIL",
      to: `/author/items/${window.location.pathname.split("/")[3]}/item-detail`
    },
    {
      title: "SELECT A QUESTION TYPE",
      to: ""
    }
  ];
  return (
    <Container>
      <FlexContainer alignItems="flex-start">
        <Title>{title}</Title>
      </FlexContainer>
      <Breadcrumb data={breadcrumbData} />
    </Container>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
