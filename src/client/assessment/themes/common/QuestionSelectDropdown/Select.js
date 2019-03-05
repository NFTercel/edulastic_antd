import styled from "styled-components";

const Select = styled.select`
  padding: 1em 2em;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: ${props => props.theme.selectBgColor};
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.07);
  color: ${props => props.theme.selectTextColor};
  font-size: 14px;
  border: none;
  -webkit-appearance: none;
`;

export default Select;
