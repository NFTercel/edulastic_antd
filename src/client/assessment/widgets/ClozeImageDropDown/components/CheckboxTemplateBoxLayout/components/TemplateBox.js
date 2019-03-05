import React from "react";
import PropTypes from "prop-types";

const TemplateBox = ({ children }) => <div className="imagedragdrop_template_box">{children}</div>;

TemplateBox.propTypes = {
  children: PropTypes.any.isRequired
};

export default TemplateBox;
