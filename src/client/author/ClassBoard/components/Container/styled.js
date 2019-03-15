import { Link } from "react-router-dom";
import { Card, Checkbox, Button } from "antd";
import styled from "styled-components";
import { FlexContainer } from "@edulastic/common";
import { themes } from "../../../../student/themes";

const classBoardTheme = themes.default.classboard;

export const PaginationInfo = styled.span`
  font-weight: 600;
  display: inline-block
  font-size: 11px;
  word-spacing:5px;
  color: ${classBoardTheme.headerContainerColor}
`;

export const CheckContainer = styled.span`
  font-weight: bold;
  display: inline-block;
  font-size: 15px;
  > span {
    margin-left: 0;
  }
`;

export const ButtonGroup = styled.div`
  display: inline-block;
`;

export const StyledFlexContainer = styled(FlexContainer)`
  width: 95%;
  margin: 20px auto;
`;

export const AnchorLink = styled(Link)`
  color: ${classBoardTheme.headerAnchorLink};
`;

export const Anchor = styled.a`
  color: ${classBoardTheme.headerAnchorLink};
`;

export const StyledCard = styled(Card)`
  margin: auto;
  width: 95%;
  border-radius: 10px;
  box-shadow: 3px 2px 7px lightgray;
  .ant-card-body {
    padding: 30px 30px 15px 30px;
  }
`;

export const StudentButtonDiv = styled.div`
  margin-left: auto;
  margin-right: 20px !important;

  .ant-btn-primary {
    background-color: #0e93dc;
  }
`;

export const StudentButton = styled(Button)`
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  padding: 0px 30px;
  font-size: 11px;
  font-weight: 600;
`;

export const QuestionButton = styled(Button)`
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  padding: 0px 30px;
  font-size: 11px;
  font-weight: 600;
`;

export const BarDiv = styled.div`
  width: 1px;
  height: 30px;
  background-color: ${classBoardTheme.headerBarbgcolor};
  display: inline-block;
  margin-bottom: -6px;
`;

export const StyledCheckbox = styled(Checkbox)`
  font-size: 0.7em;
  color: ${classBoardTheme.headerCheckboxColor};
`;

export const SpaceDiv = styled.div`
  display:inline-block
  width:20px;
`;

export const ButtonSpace = styled.div`
  display:inline-block
  width:13px;
`;

export const StyledButton = styled(Button)`
  font-size: 0.7em;
  background-color: transparent;
  margin: 0px 23px 0px -5px;
  width: 100px;
  height: 25px;
  color: ${classBoardTheme.headerButtonColor};
  border: 1px solid #00b0ff;
  font-weight: bold;
`;

export const StyledAnc = styled(Button)`
  cursor: grab;
  background-color: transparent;
  border: none;
  outline: none;
  :hover {
    background-color: transparent;
    border: none;
    outline: none;
  }
  :active {
    background-color: transparent;
    border: none;
    outline: none;
  }
`;
