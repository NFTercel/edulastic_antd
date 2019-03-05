import styled from "styled-components";

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  min-height: 40px;
  margin-bottom: ${({ noMargins }) => (noMargins ? 0 : 16)}px;
`;
