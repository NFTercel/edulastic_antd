import styled from "styled-components";
import {
  WithMathFormula
} from "@edulastic/common";

export const InstructorStimulus = WithMathFormula(styled.div `
  background: ${props => props.theme.widgets.passage.instructorStimulusBgColor};
  padding: 10px;
  border-radius: 10px;
`);