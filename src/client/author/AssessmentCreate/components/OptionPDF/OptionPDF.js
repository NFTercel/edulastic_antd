import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

import PaperTitle from "../common/PaperTitle";
import { PaperCreate, Divider, DesriptionBottom } from "./styled";

const descriptionBottom = `
  Upload your assessment in PDF format and proceed to create an Edulastic Assessment
`;

const OptionPDF = ({ onClick }) => (
  <PaperCreate>
    <PaperTitle>Create from PDF</PaperTitle>
    <Button type="primary" onClick={onClick} block>
      Upload PDF
    </Button>
    <Divider />
    <DesriptionBottom>{descriptionBottom}</DesriptionBottom>
  </PaperCreate>
);

OptionPDF.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default OptionPDF;
