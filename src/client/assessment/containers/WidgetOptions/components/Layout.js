import React from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "@edulastic/localization";
import { Block } from "../../../styled/WidgetOptions/Block";
import { Heading } from "../../../styled/WidgetOptions/Heading";

const Layout = ({ children, t }) => (
  <Block data-cy="layout">
    <Heading>{t("component.options.layout")}</Heading>
    {children}
  </Block>
);

Layout.propTypes = {
  children: PropTypes.any.isRequired,
  t: PropTypes.func.isRequired
};

export default withNamespaces("assessment")(Layout);
