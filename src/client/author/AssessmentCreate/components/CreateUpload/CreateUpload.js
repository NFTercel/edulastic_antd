import React from "react";

import { IconUpload } from "@edulastic/icons";
import { grey } from "@edulastic/colors";

import PaperTitle from "../common/PaperTitle";
import { UploadDescription, CreateUploadContainer } from "./styled";

const iconStyles = {
  minWidth: "120px",
  minHeight: "77px",
  fill: grey,
  marginBottom: "20px"
};

const CreateUpload = () => (
  <CreateUploadContainer childMarginRight="0">
    <IconUpload style={iconStyles} />
    <PaperTitle>Upload Files to Get Started</PaperTitle>
    <UploadDescription>Drag and drop any .pdf or browse and select your file</UploadDescription>
  </CreateUploadContainer>
);

export default CreateUpload;
