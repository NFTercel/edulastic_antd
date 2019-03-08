import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "@edulastic/localization";

import { Label } from "../../../styled/WidgetOptions/Label";
import CommonInput from "./common/CommonInput";

const RowMinHeight = ({ t, type, ...restProps }) => (
  <Fragment>
    <Label>{t("component.options.rowMinHeight")}</Label>
    <CommonInput type={type} {...restProps} />
  </Fragment>
);

RowMinHeight.propTypes = {
  t: PropTypes.func.isRequired,
  type: PropTypes.string
};

RowMinHeight.defaultProps = {
  type: "string"
};

export default withNamespaces("assessment")(RowMinHeight);
