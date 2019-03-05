import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background: ${props => props.theme.widgets.mathFormula.iconWrapperBgColor};
  display: flex;
  align-items: center;
`;
