import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import i18n, { withNamespaces } from "@edulastic/localization";

import { Label } from "../../../styled/WidgetOptions/Label";

const BorderType = ({ t, onChange, value, size, options, ...restProps }) => (
  <Fragment>
    <Label>{t("component.options.borderType")}</Label>
    <Select
      data-cy="borderTypeSelect"
      size="large"
      value={value}
      style={{ width: "100%" }}
      onChange={onChange}
      {...restProps}
    >
      {options.map(({ value: val, label }) => (
        <Select.Option data-cy={val} key={val} value={val}>
          {label}
        </Select.Option>
      ))}
    </Select>
  </Fragment>
);

BorderType.propTypes = {
  t: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  size: PropTypes.oneOf(["default", "large", "small"]),
  value: PropTypes.oneOf(["outer", "full", "none"])
};

BorderType.defaultProps = {
  value: "full",
  size: "large",
  options: [
    { value: "outer", label: i18n.t("assessment:component.options.outer") },
    { value: "full", label: i18n.t("assessment:component.options.full") },
    { value: "none", label: i18n.t("assessment:component.options.none") }
  ]
};

export default withNamespaces("assessment")(BorderType);
