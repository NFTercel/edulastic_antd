import styled from "styled-components";

export const Column = styled.td`
  padding: 0 16px 0 16px;
  word-break: break-word;
  height: 204px;
  width: ${({ rowTitles, colCount }) =>
    rowTitles.length > 0 ? 100 / colCount - 100 / colCount / 5 / colCount : 100 / colCount}%;
`;
