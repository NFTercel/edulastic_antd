import styled from "styled-components";

export const Block = styled.div`
  padding-top: ${({ isSection }) => (isSection ? 33 : 20)}px;
`;
