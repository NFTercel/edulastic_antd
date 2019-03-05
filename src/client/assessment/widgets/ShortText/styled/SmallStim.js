import styled from "styled-components";
import { Stimulus } from "@edulastic/common";

export const SmallStim = styled(Stimulus)`
  font-size: ${props => props.theme.widgets.shortText.smallStimFontSize};
  font-weight: ${({ bold, theme }) =>
    bold ? theme.widgets.shortText.smallStimBoldFontWeight : theme.widgets.shortText.smallStimFontWeight};
`;
