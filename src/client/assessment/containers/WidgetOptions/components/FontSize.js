import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import i18n, { withNamespaces } from "@edulastic/localization";

import { Label } from "../../../styled/WidgetOptions/Label";

const FontSize = ({ t, onChange, value, size, options, ...restProps }) => (
  <Fragment>
    <Label>{t("component.options.fontSize")}</Label>
    <Select
      data-cy="fontSizeSelect"
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

FontSize.propTypes = {
  t: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  size: PropTypes.oneOf(["default", "large", "small"]),
  value: PropTypes.oneOf(["small", "normal", "large", "xlarge", "xxlarge"])
};

FontSize.defaultProps = {
  value: "normal",
  size: "large",
  options: [
    { value: "small", label: i18n.t("assessment:component.options.small") },
    { value: "normal", label: i18n.t("assessment:component.options.normal") },
    { value: "large", label: i18n.t("assessment:component.options.large") },
    { value: "xlarge", label: i18n.t("assessment:component.options.extraLarge") },
    { value: "xxlarge", label: i18n.t("assessment:component.options.huge") }
  ]
};

export default withNamespaces("assessment")(FontSize);
