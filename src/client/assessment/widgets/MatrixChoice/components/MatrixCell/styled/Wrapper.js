import styled from "styled-components";

const getCellColor = (correct, theme) => {
  switch (correct) {
    case true:
      return theme.widgets.matrixChoice.correctCellInputWrapperBgColor;
    case "incorrect":
      return theme.widgets.matrixChoice.incorrectCellInputWrapperBgColor;
    default:
      return "";
  }
};

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => getCellColor(props.correct, props.theme)};
  padding: ${props => (props.smallSize ? 1 : 15)}px;
`;
