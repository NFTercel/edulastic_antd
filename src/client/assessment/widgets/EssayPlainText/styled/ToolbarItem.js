import styled from "styled-components";
import { Item } from "../../../styled/Item";

export const ToolbarItem = styled(Item)`
  height: 100%;

  &:hover {
    cursor: pointer;
    background: ${props => props.theme.widgets.essayPlainText.toolbarItemBgHoverColor};
  }
  &:active {
    background: ${props => props.theme.widgets.essayPlainText.toolbarItemBgActiveColor};
  }
`;
