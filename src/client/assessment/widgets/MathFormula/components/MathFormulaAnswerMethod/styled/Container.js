import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid ${props => props.theme.widgets.mathFormula.answerMethodContainerBorderColor};
  padding: 25px;
  margin-bottom: 15px;

  :last-child {
    margin-bottom: 0;
  }
`;
