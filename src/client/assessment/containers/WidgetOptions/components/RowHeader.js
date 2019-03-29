import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "@edulastic/localization";

import { Label } from "../../../styled/WidgetOptions/Label";
import CommonQuillInput from "./common/CommonQuillInput";

const RowHeader = ({ t, onChange, value, size, ...restProps }) => (
  <Fragment>
    <Label data-cy="rowHeaderInput">{t("component.options.rowHeader")}</Label>
    <CommonQuillInput toolbarId="row_header" onChange={onChange} showResponseBtn={false} value={value} {...restProps} />
  </Fragment>
);

RowHeader.propTypes = {
  t: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["default", "large", "small"]),
  value: PropTypes.string
};

RowHeader.defaultProps = {
  value: "",
  size: "large"
};

export default withNamespaces("assessment")(RowHeader);
