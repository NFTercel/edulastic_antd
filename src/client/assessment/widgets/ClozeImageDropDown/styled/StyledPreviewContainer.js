import styled from "styled-components";

export const StyledPreviewContainer = styled.div`
  position: relative;
  top: 0px;
  left: 0px;
  width: ${props => (props.smallSize ? "100%" : `${props.width}px`)};
  height: 100%;
  min-width: ${props => (props.smallSize ? "100%" : "480px")};
  max-width: 100%;
  margin: auto;
`;
