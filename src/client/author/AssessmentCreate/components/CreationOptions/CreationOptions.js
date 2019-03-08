import React from "react";
import PropTypes from "prop-types";

import OptionPDF from "../OptionPDF/OptionPDF";
import { OptionsContainer } from "./styled";

const CreationOptions = ({ onUploadPDF }) => (
  <OptionsContainer>
    <OptionPDF onClick={onUploadPDF} />
  </OptionsContainer>
);

CreationOptions.propTypes = {
  onUploadPDF: PropTypes.func.isRequired
};

export default CreationOptions;
