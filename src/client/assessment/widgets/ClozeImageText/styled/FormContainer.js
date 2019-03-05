import styled from "styled-components";
import { FlexContainer } from "./FlexContainer";

export const FormContainer = styled(FlexContainer)`
  background: ${props => props.theme.widgets.clozeImageText.formContainerBgColor};
  height: 67px;
  font-size: ${props => props.theme.widgets.clozeImageText.formContainerFontSize};
  font-weight: ${props => props.theme.widgets.clozeImageText.formContainerFontWeight};
  color: ${props => props.theme.widgets.clozeImageText.formContainerColor};
  border-bottom: 1px solid ${props => props.theme.widgets.clozeImageText.formContainerBorderColor};
  border-radius: 10px 10px 0px 0px;
  overflow: hidden;
`;
