import styled from "styled-components";

export const Flex = styled.div`
  flex: 1;
  flex-direction: ${({ flexDir }) => flexDir || "inherit"};
  display: ${({ flexDir }) => (flexDir ? "flex" : "initial")};
`;
