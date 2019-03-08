import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "@edulastic/localization";

import { Label } from "../../../styled/WidgetOptions/Label";
import CommonInput from "./common/CommonInput";

const MaximumResponsesPerCell = ({ t, type, ...restProps }) => (
  <Fragment>
    <Label>{t("component.options.maximumResponsesPerCell")}</Label>
    <CommonInput type={type} {...restProps} />
  </Fragment>
);

MaximumResponsesPerCell.propTypes = {
  t: PropTypes.func.isRequired,
  type: PropTypes.string
};

MaximumResponsesPerCell.defaultProps = {
  type: "number"
};

export default withNamespaces("assessment")(MaximumResponsesPerCell);
