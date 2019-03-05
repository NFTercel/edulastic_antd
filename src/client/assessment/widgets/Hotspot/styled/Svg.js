import styled from "styled-components";

export const Svg = styled.svg`
  cursor: ${({ intersect }) => (intersect ? "not-allowed" : "normal")};
`;
