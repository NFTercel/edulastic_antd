import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import i18n, { withNamespaces } from "@edulastic/localization";

import { Label } from "../../../styled/WidgetOptions/Label";

const InputType = ({ t, onChange, value, size, options, ...restProps }) => (
  <Fragment>
    <Label>{t("component.options.inputtype")}</Label>
    <Select
      data-cy="inputTypeSelect"
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

InputType.propTypes = {
  t: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  size: PropTypes.oneOf(["default", "large", "small"]),
  value: PropTypes.oneOf(["text", "number"])
};

InputType.defaultProps = {
  value: "text",
  size: "large",
  options: [
    { value: "text", label: i18n.t("assessment:component.options.text") },
    { value: "number", label: i18n.t("assessment:component.options.number") }
  ]
};

export default withNamespaces("assessment")(InputType);
