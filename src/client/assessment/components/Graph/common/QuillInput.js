import React, { memo } from "react";
import PropTypes from "prop-types";
import { CustomQuillComponent } from "@edulastic/common";
import { grey, secondaryTextColor } from "@edulastic/colors";

const QuillInput = ({ onChange, value, style, placeholder, toolbarId }) => (
  <div style={{ width: "99%" }}>
    <CustomQuillComponent
      toolbarId={toolbarId}
      placeholder={placeholder}
      onChange={onChange}
      showResponseBtn={false}
      value={value}
      style={style}
    />
  </div>
);

QuillInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  style: PropTypes.object,
  placeholder: PropTypes.string,
  toolbarId: PropTypes.string.isRequired
};

QuillInput.defaultProps = {
  style: {
    minHeight: "40px",
    margin: "11px 0 0 0",
    outline: 0,
    borderRadius: "5px",
    border: `1px solid ${grey}`,
    color: `${secondaryTextColor}`,
    backgroundColor: "#fff",
    fontSize: "13px",
    lineHeight: "1.38",
    width: "99%"
  },
  placeholder: ""
};

export default memo(QuillInput);
