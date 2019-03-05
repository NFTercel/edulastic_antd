import styled from "styled-components";
import { InputNumber } from "antd";

export const ImageWidthInput = styled(InputNumber)`
  height: 40px;
  padding: 5px;
  color: ${props => props.theme.widgets.clozeImageDropDown.imageWidthColor};
  font-weight: ${props => props.theme.widgets.clozeImageDropDown.imageWidthFontWeight};
`;
