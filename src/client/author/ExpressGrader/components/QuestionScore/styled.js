import styled from "styled-components";

export const StyledWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
`;

export const StyledText = styled.span`
  color: ${props => props.color};
`;
