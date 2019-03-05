import styled from "styled-components";

const SVG = styled("svg")`
  width: ${({ width = 15 }) => width}px;
  height: ${({ height = 15 }) => height}px;
  fill: ${({ color = "#000" }) => color};
  left: ${({ left }) => left}px;
  background: ${({ backgroundColor }) => backgroundColor};

  :hover {
    fill: ${({ hoverColor }) => hoverColor};
  }
`;

export default SVG;
