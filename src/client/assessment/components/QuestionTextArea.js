import React, { memo } from "react";
import PropTypes from "prop-types";
import { CustomQuillComponent } from "@edulastic/common";

const QuestionTextArea = ({ onChange, value, style, firstFocus, placeholder }) => (
  <div style={style}>
    <CustomQuillComponent
      toolbarId="stimulus"
      firstFocus={firstFocus}
      placeholder={placeholder}
      onChange={onChange}
      showResponseBtn={false}
      value={value}
    />
  </div>
);

QuestionTextArea.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  style: PropTypes.object,
  firstFocus: PropTypes.bool,
  placeholder: PropTypes.string
};

QuestionTextArea.defaultProps = {
  style: {},
  firstFocus: false,
  placeholder: "Enter a question"
};

export default memo(QuestionTextArea);
