import { Upload } from "antd";
import styled from "styled-components";

import { Paper } from "@edulastic/common";
import { grey } from "@edulastic/colors";

const { Dragger } = Upload;

export const DropAreaContainer = styled(Paper)`
  margin: 34px 43px 0 46px;
  border-radius: 4px;
`;

export const UploadDragger = styled(Dragger)`
  display: block;
  border: 1px dashed ${grey};

  .ant-upload-drag {
    padding: 0;
    height: 65vh;
  }

  .ant-upload-list {
    display: none;
  }

  .ant-upload-btn {
    padding: 0;
  }

  .ant-upload-drag-container {
    padding: 0;
    height: 100%;
  }
`;
