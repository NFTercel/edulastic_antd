import styled from "styled-components";
import { newBlue, secondaryTextColor } from "@edulastic/colors";

export const CheckboxContainer = styled.div`
  width: ${props => (props.smallSize ? 22 : 40)}px;
  height: ${props => (props.smallSize ? 22 : 40)}px;
  padding: ${props => (props.smallSize ? 0 : 0)}px;
  /* border: solid 2px ${props => props.theme.widgets.multipleChoice.checkboxContainerBorderColor}; */
  border-radius: 50%;
  box-sizing: border-box;
  margin-right: 13px;

  + div {
    font-size: 14px;
    font-weight: 700;
    color: ${secondaryTextColor};
  }
  & input {
    opacity: 0;
    display: none;
  }

  & div {
    width: 100%;
    height: 100%;
    display: block;
    line-height: 1;
  }

  & span {
    width: 100%;
    height: 100%;
    display: ${props => (props.smallSize ? "block" : "flex")};
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    /* background-color: ${props => props.theme.widgets.multipleChoice.checkboxContainerBgColor}; */
    background-color: #F8F8F8;
    -webkit-transition: backgroundColor 0.6s;
    transition: backgroundColor 0.6s;
    text-align: center;
    font-size: ${props =>
      props.smallSize
        ? props.theme.widgets.multipleChoice.checkboxContainerSmallFontSize
        : props.theme.widgets.multipleChoice.checkboxContainerFontSize};
    font-weight: ${props => props.theme.widgets.multipleChoice.checkboxContainerFontWeight};
    color:#444444;
    /* color: ${props => props.theme.widgets.multipleChoice.checkboxContainerColor}; */
  }

  & div {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: ${props => (props.smallSize ? "block" : "none")};
    background-color: ${props => props.theme.widgets.multipleChoice.checkboxContainerBgColor};
  }

  & input:checked + span {
    color: ${props => props.theme.widgets.multipleChoice.checkboxContainerCheckedColor};
    background-color: ${props => props.theme.widgets.multipleChoice.checkboxContainerCheckedBgColor};
    -webkit-transition: backgroundColor 0.6s;
    transition: backgroundColor 0.6s;
  }

  & input:checked + span + div {
    background-color: ${props => props.theme.widgets.multipleChoice.checkboxContainerCheckedBgColor};
    -webkit-transition: backgroundColor 0.6s;
    transition: backgroundColor 0.6s;
    display: none;
  }
`;
