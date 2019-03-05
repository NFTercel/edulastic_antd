import styled from "styled-components";
import { FlexContainer } from "./FlexContainer";

export const FormContainer = styled(FlexContainer)`
  background: ${props => props.theme.widgets.clozeImageDropDown.formContainerBgColor};
  height: 67px;
  font-size: ${props => props.theme.widgets.clozeImageDropDown.formContainerFontSize};
  font-weight: ${props => props.theme.widgets.clozeImageDropDown.formContainerFontWeight};
  color: ${props => props.theme.widgets.clozeImageDropDown.formContainerColor};
  border-bottom: 1px solid ${props => props.theme.widgets.clozeImageDropDown.formContainerBorderColor};
  border-radius: 10px 10px 0px 0px;
  overflow: hidden;
`;
