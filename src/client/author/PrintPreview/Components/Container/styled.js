import styled from "styled-components";

export const PrintPreviewBack = styled.div`
  width: 100%;
  background-color: #cccccc;
  display: block;
`;

export const PrintPreviewContainer = styled.div`
  padding: 0;
  width: 25cm;
  min-height: 29.7cm;
  margin: 0 auto;
  background-color: #fff;
  height: "";
  font-variant: normal !important;

  * {
    font-variant: normal !important;
    -webkit-print-color-adjust: exact !important;
  }

  .sc-ellAub {
    page-break-inside: avoid;
  }

  textarea.ant-input {
    display: none;
  }

  input[type="text"] {
    pointer-events: none;
  }

  .ant-card {
    max-width: 40%;
  }
`;

export const StyledTitle = styled.p`
  font-size: 30px;
  text-align: left;
  font-weight: normal;
  padding: 15px 0 0 25px;
  margin: 0;
`;

export const Color = styled.span`
  color: #58b294;
`;
