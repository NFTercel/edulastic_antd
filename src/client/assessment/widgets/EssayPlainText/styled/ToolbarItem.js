import styled from "styled-components";
import { Item } from "../../../styled/Item";

export const ToolbarItem = styled(Item)`
  &:hover {
    cursor: pointer;
    background: ${props => props.theme.widgets.essayPlainText.toolbarItemBgHoverColor};
  }
  &:active {
    background: ${props => props.theme.widgets.essayPlainText.toolbarItemBgActiveColor};
  }
`;
