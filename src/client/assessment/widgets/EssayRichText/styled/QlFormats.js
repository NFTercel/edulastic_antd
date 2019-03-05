import styled from "styled-components";

export const QlFormats = styled.span`
  display: flex;
  flex-wrap: wrap;

  & > * {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 20px;
  }
  & > *:last-child {
    margin-right: 0;
  }
`;
