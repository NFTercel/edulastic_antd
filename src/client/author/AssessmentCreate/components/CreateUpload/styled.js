import styled from "styled-components";

import { grey, darkGrey } from "@edulastic/colors";
import { FlexContainer } from "@edulastic/common";

export const UploadDescription = styled.p`
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${darkGrey};
  margin-top: 5px !important;
`;

export const CreateUploadContainer = styled(FlexContainer)`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
  height: 70%;
  border-right: 1px dashed ${grey};
  /* todo: delete when upload icon is available */
  padding-bottom: 90px;
`;
