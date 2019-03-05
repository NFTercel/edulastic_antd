import styled from "styled-components";

export const StyledPreviewImage = styled.img`
  width: 100%;
  height: ${props => (props.smallSize ? "100%" : "auto")};
  user-select: none;
  pointer-events: none;
  object-fit: contain;
`;
