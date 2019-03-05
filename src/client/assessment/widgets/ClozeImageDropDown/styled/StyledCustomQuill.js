import styled from "styled-components";
import { CustomQuillComponent } from "@edulastic/common";

export const StyledCustomQuill = styled(CustomQuillComponent)`
  min-height: 134px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.widgets.clozeImageDropDown.customQuilBorderColor};
  padding: 18px 33px;
`;
