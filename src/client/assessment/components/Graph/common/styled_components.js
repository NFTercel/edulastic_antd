import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import { greenDark, grey, tabletWidth, greenDarkSecondary, secondaryTextColor, mobileWidth } from "@edulastic/colors";
import { TextField, Paper } from "@edulastic/common";

export const InstructorStimulus = styled.p`
  border-radius: 3px;
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 18px;
  background: ${grey};
`;

export const StyledTextarea = styled(TextareaAutosize)`
  margin-top: 15px;
  resize: none;
  width: 100%;
  min-height: 134px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 10px 30px;
  box-sizing: border-box;
  border: 1px solid ${grey};
  outline: none;

  &.small {
    min-height: auto;
  }

  &.big {
    min-height: 135px;
  }
`;

export const Subtitle = styled.div`
  color: ${secondaryTextColor};
  margin-bottom: 35px;
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.35;
  letter-spacing: normal;
  text-align: left;
`;

export const StyledTextField = styled(TextField)`
  width: ${props => (props.width ? `${props.width}` : "100px")};
  padding: 0 0 0 40px;
  margin-right: 3em;
  height: 40px;
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : "1em")};
  border-radius: 4px;
`;

export const LineInput = styled(TextField)`
  width: 100px;
  text-align: center;
  margin-right: 25px;
  height: 50px;
`;

export const Label = styled.label`
  display: block;
  margin-right: 0.7em;
  margin-bottom: 0.7em;
  font-weight: 600;
`;

export const ToolSubTitle = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  color: #434b5d;
  font-size: 13px;
  line-height: 18px;
  font-weight: 600;
  margin-bottom: 9px;
  letter-spacing: 0.2px;
`;

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const GraphToolsParamsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const AddToolBtnWrapper = styled.div`
  width: 100%;
  margin-top: 14px;
`;

export const ToolSelect = styled.div`
  & + & {
    margin-top: 17px;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  width: 50%;

  @media (max-width: ${tabletWidth}) {
    flex-direction: column;
  }
`;

export const MoreOptionsContainer = styled(Container)`
  width: 100%;
  padding: 33px 0 0 0;
  align-items: flex-start;
  flex-direction: column;
`;

export const ContainerStart = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: ${tabletWidth}) {
    flex-direction: column;
  }
`;

export const LineParameter = styled.div`
  display: block;
  width: 50%;
`;

export const TitleTextInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 20px 0 20px;
  outline: 0;
  border-radius: 4px;
  border: 1px solid #dfdfdf;
  color: #7a7a7a;
  background-color: transparent;
`;

export const StyledDragHandle = styled.div`
  width: 50px;
  flex: 1;
  border-top: 1px solid ${grey};
  border-bottom: 1px solid ${grey};
  border-left: 1px solid ${grey};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  padding: 6px;

  svg {
    height: 16px;
    width: 16px;
  }
`;

export const Item = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  margin-right: 15px;
`;

export const MoreOptions = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const MoreOptionsHeading = styled.div`
  width: 100%;
  font-size: 14px;
  padding: 6px 0;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const MoreOptionsToggler = styled.div`
  width: 18.9px;
  height: 2.4px;
  background-color: ${greenDark};
  cursor: pointer;
  :hover {
    background-color: ${greenDarkSecondary};
  }
`;

export const MoreOptionsColumnContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export const MoreOptionsColumn = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const MoreOptionsRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 30px;
`;

export const MoreOptionsRowInline = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 16px;
`;

export const MoreOptionsSubHeading = styled.div`
  color: ${secondaryTextColor};
  margin-bottom: 35px;
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.35;
  letter-spacing: normal;
  text-align: left;
  // width: 100%;
  // color: ${greenDark};
  // font-size: 14px;
  // margin: 2px 0;
  // font-weight: 600;
  // line-height: 1.36;
`;

export const MoreOptionsLabel = styled.div`
  color: ${secondaryTextColor};
  font-size: 13px;
  font-weight: 600;
  line-height: 1.38;
`;

export const MoreOptionsLabelInline = styled(MoreOptionsLabel)`
  width: auto;
`;

export const MoreOptionsInput = styled.input`
  width: 77%;
  height: 40px;
  margin: 11px 0 0 0;
  padding: 0 15px 0 15px;
  outline: 0;
  border-radius: 5px;
  border: 1px solid ${grey};
  color: ${secondaryTextColor};
  background-color: #fff;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.38;
`;

export const MoreOptionsInputSmall = styled(MoreOptionsInput)`
  width: 7em;
  margin: 0;
  padding: 0 5px 0 20px;
  text-align: center;
`;

export const SelectContainer = styled.div`
  position: relative;
  width: ${props => (props.width ? `${props.width}px` : "100%")};
  height: ${props => (props.height ? `${props.height}px` : "58px")};

  &:before {
    position: absolute;
    font-family: "FontAwesome";
    top: 0;
    right: 25px;
    display: flex;
    align-items: center;
    height: 100%;
    color: blue;
    content: "\f0d7";
  }

  @media (max-width: 760px) {
    height: 52px;
    width: 188px;
  }
`;

export const Select = styled.select`
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
  outline: none;
  -webkit-appearance: none;
`;

export const MoreOptionsDivider = styled.div`
  width: 100%;
  height: 1px;
  padding: 0;
  margin-top: 48px;
  background-color: ${props => (props.backgroundColor ? props.backgroundColor : grey)};
`;

export const Row = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : "15px")};
  flex-wrap: wrap;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: ${props => (props.paddingRight ? props.paddingRight : "0")};
  padding-left: ${props => (props.paddingLeft ? props.paddingLeft : "0")};
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : "0")}px;
  width: ${({ md }) => (100 / 12) * md}%;
  display: block;
`;

export const PaperWrapper = styled(Paper)`
  padding: 15px 25px;
  @media (max-width: ${mobileWidth}) {
    padding: 8px;
  }
`;
