import styled from "styled-components";
import { FlexContainer } from "@edulastic/common";

export const Container = styled(FlexContainer)`
  height: 616px;
  width: 100%;
  border: ${({ theme, isDragActive }) =>
    isDragActive
      ? `2px solid ${theme.styledDropZone.containerDragActiveColor}`
      : `1px solid ${theme.styledDropZone.containerColor}`};
`;
