import styled from "styled-components";

export const ColorBox = styled.div`
  width: 40px;
  height: 40px;
  padding: 5px;
  border-radius: 5px;
  margin: 5px 10px;
  background: ${props => props.theme.widgets.clozeImageDropDown.colorBoxBgColor};
  border: '1px solid ${props => props.theme.widgets.clozeImageDropDown.colorBoxBorderColor}';
  background-color: ${props => props.background}
`;
