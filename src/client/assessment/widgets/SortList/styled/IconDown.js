import styled from "styled-components";
import { IconCarets } from "@edulastic/icons";

const { IconCaretDown } = IconCarets;

export const IconDown = styled(IconCaretDown)`
  color: ${props => props.theme.widgets.sortList.iconArrowColor};
  margin: 0;
  font-size: ${({ smallSize, theme }) =>
    smallSize ? theme.widgets.sortList.iconArrowSmallFontSize : theme.widgets.sortList.iconArrowFontSize};
`;
