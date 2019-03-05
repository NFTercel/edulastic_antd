import styled from "styled-components";

export const Item = styled.div`
  width: 25%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${props => props.theme.numberPad.itemBorderColor};
  color: ${props => props.theme.numberPad.itemColor};
  font-weight: ${props => props.theme.numberPad.itemFontWeight};
  background: ${props => props.theme.numberPad.itemBgColor};
  cursor: pointer;
  user-select: none;

  :hover {
    background: ${props => props.theme.numberPad.itemBgHoverColor};
  }

  :active {
    background: ${props => props.theme.numberPad.itemBgActiveColor};
  }
`;
