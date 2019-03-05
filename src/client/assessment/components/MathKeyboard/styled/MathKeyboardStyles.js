import styled from "styled-components";

export const MathKeyboardStyles = styled.div`
  .keyboard {
    display: inline-block;
    padding: 10px;
    border: 1px solid ${props => props.theme.mathKeyboard.keyboardBorderColor};
    background: ${props => props.theme.mathKeyboard.keyboardBgColor};
    border-radius: 5px;
  }
  s .keyboard__header {
    display: flex;
    justify-content: space-between;
  }

  .keyboard__header__select {
    width: 251.7px;
    border-radius: 5px;
    box-shadow: 0 2px 6px 0 ${props => props.theme.mathKeyboard.dropDownShadowColor};
    background-color: ${props => props.theme.mathKeyboard.dropDownBgColor};
    font-family: ${props => props.theme.mathKeyboard.dropDownFontFamily};
    font-size: ${props => props.theme.mathKeyboard.dropDownFontSize};
    font-weight: ${props => props.theme.mathKeyboard.dropDownFontWeight};
    font-style: ${props => props.theme.mathKeyboard.dropDownFontStyle};
    font-stretch: ${props => props.theme.mathKeyboard.dropDownFontStretch};
    line-height: 1.38;
    letter-spacing: 0.2px;
    text-align: left;
    color: ${props => props.theme.mathKeyboard.dropDownColor};
    border: none;
    outline: none;
    margin-right: 10px;
  }
  .keyboard__header__select .ant-select-selection--single {
    border: none;
  }

  .keyboard__dropdown-icon {
    color: ${props => props.theme.mathKeyboard.dropDownIconColor};
  }

  .keyboard__header__close {
    border-color: ${props => props.theme.mathKeyboard.closeButtonBorderColor};
  }

  .keyboard__types3 {
    display: flex;
    flex-wrap: wrap;
  }

  .keyboard__main {
    display: flex;
    flex-wrap: nowrap;
  }

  .half-box {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    max-height: 325px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .num {
    width: 25%;
    height: 65px;
    border-color: ${props => props.theme.mathKeyboard.numBorderColor};
    border-radius: 0;
    font-family: ${props => props.theme.mathKeyboard.numFontFamily};
    font-size: ${props => props.theme.mathKeyboard.numFontSize};
    font-weight: ${props => props.theme.mathKeyboard.numFontWeight};
    font-style: ${props => props.theme.mathKeyboard.numFontStyle};
    font-stretch: ${props => props.theme.mathKeyboard.numFontStretch};
    line-height: 1.38;
    letter-spacing: normal;
    text-align: center;
    color: ${props => props.theme.mathKeyboard.numColor};

    :disabled,
    :disabled:hover {
      background: ${props => props.theme.mathKeyboard.numBgDisabledColor};
      border-color: ${props => props.theme.mathKeyboard.numBorderDisabledColor};
    }

    :active {
      background-color: ${props => props.theme.mathKeyboard.numBgActiveColor};
    }

    :hover {
      background-color: ${props => props.theme.mathKeyboard.numBgHoverColor};
    }
  }

  .num--type-1 {
    background-color: ${props => props.theme.mathKeyboard.numType1BgColor};
  }

  .num--type-2 {
    background-color: ${props => props.theme.mathKeyboard.numType2BgColor};
  }

  .num--type-3 {
    background-color: ${props => props.theme.mathKeyboard.numType3BgColor};
    color: ${props => props.theme.mathKeyboard.numType3Color};
  }

  .italic {
    font-style: italic;
  }

  .num__image {
    object-fit: contain;
    width: 25px;
  }

  .num__image-sqrt {
    width: 25px;
  }

  .num__image-frac1 {
    width: 33px;
    margin-top: 12px;
  }

  .num__image-frac2 {
    width: 46px;
  }

  .num__image-expo {
    width: 24px;
    margin-top: -20px;
  }

  .num__image-log {
    width: 24px;
    margin-top: 20px;
  }

  .num__image-bracket {
    width: 30px;
  }

  .num__image-bar {
    width: 30px;
  }

  .num__image-back {
    width: 18.6px;
  }

  .num__equal {
    width: 100%;
    height: 25px;
  }

  .num__move {
    width: 50%;
    height: 15px;
  }

  .num__backspace {
    height: 17px;
  }
`;
