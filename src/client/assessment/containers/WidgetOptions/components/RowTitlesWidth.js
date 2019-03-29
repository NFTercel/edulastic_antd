import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "@edulastic/localization";

import { Label } from "../../../styled/WidgetOptions/Label";
import CommonInput from "./common/CommonInput";

const RowTitlesWidth = ({ t, type, ...restProps }) => (
  <Fragment>
    <Label>{t("component.options.rowTitlesWidth")}</Label>
    <CommonInput data-cy="rowTitlesWidthInput" type={type} {...restProps} />
  </Fragment>
);

RowTitlesWidth.propTypes = {
  t: PropTypes.func.isRequired,
  type: PropTypes.string
};

RowTitlesWidth.defaultProps = {
  type: "string"
};

export default withNamespaces("assessment")(RowTitlesWidth);
