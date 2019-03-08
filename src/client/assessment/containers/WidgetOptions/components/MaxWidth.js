import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "@edulastic/localization";

import { Label } from "../../../styled/WidgetOptions/Label";
import CommonInput from "./common/CommonInput";

const MaxWidth = ({ t, type, value, ...restProps }) => (
  <Fragment>
    <Label>{t("component.options.maximumWidth")}</Label>
    <CommonInput value={value} type={type} {...restProps} />
  </Fragment>
);

MaxWidth.propTypes = {
  t: PropTypes.func.isRequired,
  value: PropTypes.number,
  type: PropTypes.string
};

MaxWidth.defaultProps = {
  type: "number",
  value: 0
};

export default withNamespaces("assessment")(MaxWidth);
