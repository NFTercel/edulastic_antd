import styled from "styled-components";

export const Hr = styled.hr`
  border: none;
  border-top: 1px solid ${props => props.theme.widgets.clozeImageDropDown.hrBorderColor};
  margin-top: 40px;
  margin-bottom: 40px;
`;
