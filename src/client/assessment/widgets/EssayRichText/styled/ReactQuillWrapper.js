import styled from "styled-components";
import ReactQuill from "react-quill";

export const ReactQuillWrapper = styled(ReactQuill)`
  .ql-container,
  .ql-editor {
    min-height: ${props => props.minHeight}px;
    max-height: ${props => props.maxHeight}px;
    font-size: ${props => props.fontSize} !important;
  }
`;
