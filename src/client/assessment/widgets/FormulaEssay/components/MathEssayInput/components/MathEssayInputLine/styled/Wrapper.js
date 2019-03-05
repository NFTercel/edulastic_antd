import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  border: 1px solid ${props => props.theme.mathEssayInput.inputWrapperBorderColor};
  position: relative;

  ${props =>
    props.active &&
    css`
      border-color: ${props.theme.mathEssayInput.inputWrapperActiveClassBorderColor};
      border-left-color: ${props.theme.mathEssayInput.inputWrapperActiveClassBorderLeftColor};
      border-right-color: ${props.theme.mathEssayInput.inputWrapperActiveClassBorderRightColor};
    `}
`;
