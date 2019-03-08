import React from "react";
import { CustomQuillComponent } from "@edulastic/common";
import { withTheme } from "styled-components";

const CommonQuillInput = ({ theme, ...props }) => {
  const inputStyle = {
    height: 40,
    border: `1px solid ${theme.extras.inputBorderColor}`,
    borderRadius: "4px"
  };

  return <CustomQuillComponent style={inputStyle} {...props} />;
};

export default withTheme(CommonQuillInput);
