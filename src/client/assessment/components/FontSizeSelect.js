import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Select } from "antd";

import { withNamespaces } from "@edulastic/localization";

import { Label } from "../styled/WidgetOptions/Label";

const FontSizeSelect = ({ t, onChange, value }) => {
  const options = [
    { value: "small", label: t("component.options.small") },
    { value: "normal", label: t("component.options.normal") },
    { value: "large", label: t("component.options.large") },
    { value: "xlarge", label: t("component.options.extraLarge") },
    { value: "xxlarge", label: t("component.options.huge") }
  ];

  return (
    <Fragment>
      <Label>{t("component.options.fontSize")}</Label>
      <Select data-cy="fontSizeSelect" size="large" value={value} style={{ width: "100%" }} onChange={onChange}>
        {options.map(({ value: val, label }) => (
          <Select.Option data-cy={val} key={val} value={val}>
            {label}
          </Select.Option>
        ))}
      </Select>
    </Fragment>
  );
};

FontSizeSelect.propTypes = {
  t: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any
};

FontSizeSelect.defaultProps = {
  value: "normal"
};

export default withNamespaces("assessment")(FontSizeSelect);
