import React from "react";
import PropTypes from "prop-types";

import { FlexContainer } from "@edulastic/common";

import { DropAreaContainer, UploadDragger } from "./styled";
import CreateUpload from "../CreateUpload/CreateUpload";
import CreateBlank from "../CreateBlank/CreateBlank";

const DropArea = ({ onUpload, onCreateBlank }) => (
  <DropAreaContainer>
    <UploadDragger name="file" onChange={onUpload} accept=".pdf">
      <FlexContainer childMarginRight="0" style={{ height: "100%" }}>
        <CreateUpload />
        <CreateBlank onCreate={onCreateBlank} />
      </FlexContainer>
    </UploadDragger>
  </DropAreaContainer>
);

DropArea.propTypes = {
  onUpload: PropTypes.func.isRequired,
  onCreateBlank: PropTypes.func.isRequired
};

export default DropArea;
