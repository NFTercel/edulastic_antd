import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "@edulastic/localization";

import { Label } from "../../../styled/WidgetOptions/Label";
import CommonInput from "./common/CommonInput";

const MaxSelection = ({ t, type, value, ...restProps }) => (
  <Fragment>
    <Label>{t("component.options.maxSelection")}</Label>
    <CommonInput data-cy="maxSelectionOption" value={value} type={type} {...restProps} />
  </Fragment>
);

MaxSelection.propTypes = {
  t: PropTypes.func.isRequired,
  value: PropTypes.number,
  type: PropTypes.string
};

MaxSelection.defaultProps = {
  type: "number",
  value: 0
};

export default withNamespaces("assessment")(MaxSelection);
