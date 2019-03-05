import styled from "styled-components";
import { PaddingDiv } from "@edulastic/common";

export const EditorContainer = styled(PaddingDiv)`
  border-radius: 10px;
  background: ${props => props.theme.widgets.clozeImageDropDown.editorContainerBgColor};
  box-shadow: 0 3px 10px 0 ${props => props.theme.widgets.clozeImageDropDown.editorContainerShadowColor};
`;
