import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";
import { withNamespaces } from "@edulastic/localization";

const BrowserSpellcheckCheckbox = ({ onChange, checked, t, ...restProps }) => (
  <Checkbox checked={checked} onChange={e => onChange(e.target.checked)} {...restProps}>
    {t("component.options.browserspellcheck")}
  </Checkbox>
);

BrowserSpellcheckCheckbox.propTypes = {
  t: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired
};

export default withNamespaces("assessment")(BrowserSpellcheckCheckbox);
