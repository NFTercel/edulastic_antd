import React from "react";
import { Checkbox, FlexContainer } from "@edulastic/common";
import PropTypes from "prop-types";
import { withNamespaces } from "@edulastic/localization";
import { Container, Heading } from "./styled";

const SettingsBarUseTabs = ({ onChangeLeft, onChangeRight, checkedLeft, checkedRight, t }) => (
  <Container>
    <Heading>{t("component.settingsBar.useTabs")}</Heading>
    <FlexContainer justifyContent="space-between">
      <Checkbox label={t("component.settingsBar.leftColumn")} onChange={onChangeLeft} checked={checkedLeft} />
      <Checkbox label={t("component.settingsBar.rightColumn")} onChange={onChangeRight} checked={checkedRight} />
    </FlexContainer>
  </Container>
);

SettingsBarUseTabs.propTypes = {
  onChangeLeft: PropTypes.func.isRequired,
  onChangeRight: PropTypes.func.isRequired,
  checkedLeft: PropTypes.bool.isRequired,
  checkedRight: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

export default withNamespaces("author")(SettingsBarUseTabs);
