import styled from "styled-components";
import { IconCarets } from "@edulastic/icons";

const { IconCaretRight } = IconCarets;

export const IconRight = styled(IconCaretRight)`
  color: ${props => props.theme.widgets.sortList.iconArrowColor};
  margin: 0;
  font-size: ${({ smallSize, theme }) =>
    smallSize ? theme.widgets.sortList.iconArrowSmallFontSize : theme.widgets.sortList.iconArrowFontSize};
`;
