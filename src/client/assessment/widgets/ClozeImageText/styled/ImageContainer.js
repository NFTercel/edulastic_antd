import styled from "styled-components";

// This is reported by `no-useless-concat`.
export const ImageContainer = styled.div`
  position: relative;
  top: 0px; left: 0px;
  min-height: 400px;
  padding: 0px;
  width: ${props => (props.width ? `${props.width}px` : "100%")}
  height: 100%;
`;
