import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";
import { withNamespaces } from "@edulastic/localization";

const ImageScaleCheckbox = ({ onChange, checked, t, ...restProps }) => (
  <Checkbox checked={checked} onChange={e => onChange(e.target.checked)} {...restProps}>
    {t("component.options.imagescale")}
  </Checkbox>
);

ImageScaleCheckbox.propTypes = {
  t: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired
};

export default withNamespaces("assessment")(ImageScaleCheckbox);
