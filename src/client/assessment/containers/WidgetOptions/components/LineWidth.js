import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "@edulastic/localization";

import { Label } from "../../../styled/WidgetOptions/Label";
import CommonInput from "./common/CommonInput";

const LineWidth = ({ t, type, ...restProps }) => (
  <Fragment>
    <Label>{t("component.options.lineWidth")}</Label>
    <CommonInput type={type} {...restProps} />
  </Fragment>
);

LineWidth.propTypes = {
  t: PropTypes.func.isRequired,
  type: PropTypes.string
};

LineWidth.defaultProps = {
  type: "number"
};

export default withNamespaces("assessment")(LineWidth);
