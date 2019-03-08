import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "@edulastic/localization";

import { Label } from "../../../styled/WidgetOptions/Label";
import CommonInput from "./common/CommonInput";

const CharactersToDisplay = ({ t, ...restProps }) => (
  <Fragment>
    <Label>{t("component.options.charactersToDisplay")}</Label>
    <CommonInput {...restProps} />
  </Fragment>
);

CharactersToDisplay.propTypes = {
  t: PropTypes.func.isRequired
};

export default withNamespaces("assessment")(CharactersToDisplay);
