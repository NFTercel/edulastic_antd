import styled from "styled-components";
import { WithMathFormula } from "@edulastic/common";

export const InlineLabel = WithMathFormula(styled.div`
  color: ${props => props.theme.widgets.matrixChoice.inlineLabelColor};
`);
