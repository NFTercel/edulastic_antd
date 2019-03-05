import styled from "styled-components";

export const RowTitleCol = styled.td`
  padding: 0 16px 0 16px;
  word-break: break-word;
  width: ${({ colCount }) => 100 / colCount / 5}%;
`;
