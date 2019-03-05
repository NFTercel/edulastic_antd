import styled from "styled-components";
import { FlexView } from "../../../styled/FlexView";

export const ImageFlexView = styled(FlexView)`
  flex-direction: column;
  align-items: center;
  background: ${props => props.theme.widgets.clozeImageDropDown.imageFlexViewBgColor};
  border-right: 1px solid ${props => props.theme.widgets.clozeImageDropDown.imageFlexViewBorderColor};
  border-bottom: 1px solid ${props => props.theme.widgets.clozeImageDropDown.imageFlexViewBorderColor};
  border-radius: 0px 0px 10px 0px;
  overflow: hidden;
  position: relative;
`;
