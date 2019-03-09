import styled from "styled-components";
import {
  WithMathFormula
} from "@edulastic/common";

export const Heading = WithMathFormula(styled.div `
  font-size: ${props => props.theme.widgets.passage.headingFontSize};
  font-weight: ${props => props.theme.widgets.passage.headingFontWeight};
  margin-bottom: 15px;
`);