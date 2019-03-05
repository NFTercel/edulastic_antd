import styled from "styled-components";
import { green } from "@edulastic/colors";

export const Label = styled.label`
  position: relative;
  display: inline-block;
  padding-left: ${props => (props.smallSize ? 5 : 20)}px;
  border: dotted 1px ${props => props.theme.widgets.multipleChoice.labelBorderColor};
  border-left: solid 3px ${props => props.theme.widgets.multipleChoice.labelBorderColor};
  margin: ${props => (props.setAnswers ? "5px 0" : "10px 0")};
  width: ${props => props.width || "100%"};

  &:hover {
    border: dotted 1px ${props => props.theme.widgets.multipleChoice.labelBorderHoverColor};
    border-left: solid 3px ${props => props.theme.widgets.multipleChoice.labelBorderHoverColor};
    cursor: pointer;
  }
  &.checked {
    background-color: ${props => props.theme.widgets.multipleChoice.labelCheckedBgColor};
    border-left: solid 3px ${props => props.theme.widgets.multipleChoice.labelCheckedBorderColor};
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  &.right {
    background-color: ${props => props.theme.widgets.multipleChoice.labelRightBgColor};
    border-left: solid 3px ${props => props.theme.widgets.multipleChoice.labelRightBorderColor};
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  &.right:hover {
    border-color: transparent;
  }
  &.wrong {
    background-color: ${props => props.theme.widgets.multipleChoice.labelWrongBgColor};
    border-left: solid 3px ${props => props.theme.widgets.multipleChoice.labelWrongBorderColor};
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  &.preview {
    cursor: initial;
    border-color: transparent;
  }
  &.preview:hover {
    border-color: transparent;
  }
  & i {
    font-size: ${props => props.theme.widgets.multipleChoice.labelIconFontSize};
    line-height: 1;
  }
  & .fa-check {
    color: ${props => props.theme.widgets.multipleChoice.labelIconCheckColor};
  }
  & .fa-times {
    color: ${props => props.theme.widgets.multipleChoice.labelIconTimesColor};
  }
`;
