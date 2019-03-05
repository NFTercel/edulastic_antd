import styled from "styled-components";

export const Buttons = styled.div`
  margin-top: 2px;
  margin-left: 6px;
  display: flex;

  .ant-btn-circle {
    background: ${props => props.theme.questionMetadata.antButtonCircleBgColor};
    box-shadow: 0 2px 5px 0 ${props => props.theme.questionMetadata.antButtonCircleShadowColor};
  }
`;
