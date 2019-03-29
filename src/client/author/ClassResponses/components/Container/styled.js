import styled from "styled-components";
import { mobileWidth } from "@edulastic/colors";
import { FlexContainer } from "@edulastic/common";
import { Card, Button } from "antd";
import { Paper } from "@edulastic/common";

export const PaginationInfo = styled.div`
  font-weight: bold;
  font-size: 10px;
  word-spacing:5px;
  display:inline-block
  margin-left:30px;
  color:#1890ffd9;
`;

export const TimeContainer = styled.div`
  margin-top: 20px;
`;

export const Color = styled.span`
  color: #58b294;
`;

export const TimeItem = styled.p`
  font-size: 0.9em;
  font-weight: bold;
  padding-left: 20px;
`;

export const ScoreContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

export const ScoreLabel = styled.p`
  color: #c0c0c0;
  font-size: 0.8em;
`;

export const TotalScore = styled.p`
  font-weight: bold;
  font-size: 2em;
`;

export const FractionLine = styled.p`
  width: 40px;
  height: 2px;
  background-color: #59595a;
  margin: auto;
`;

export const PaginationButtonGroup = styled.span`
  display: inline-block;
  margin-left: 25px;
`;

export const GraphInfo = styled.div`
  display: inline-block;
  width: 20%;
  height: 200px;
  position: absolute;
`;

export const GraphContainer = styled.div`
  display: inline-block;
  width: 75%;
`;

export const StyledFlexContainer = styled(FlexContainer)`
  width: 95%;
  margin: 20px auto;
`;

export const StyledCard = styled(Card)`
  margin: auto;
  width: 95%;
  display: flex;
  justify-content: spance-between;
  height: 270px;
  border-radius: 10px;
  box-shadow: 3px 2px 7px lightgray;
`;

export const FeedbackButton = styled(Button)`
  font-size: 0.64em;
  background-color: transparent;
  margin: 0px 23px 0px -5px;
  width: 100px;
  padding: 2px 5px;
  height: 25px;
  color: #00b0ff;
  border: 1px solid #00b0ff;
  font-weight: bold;
`;

export const OverallButton = styled(FeedbackButton)`
  font-size: 0.8em;
  color: white;
  background-color: #00b0ff;
  width: 170px;
  height: 40px;
  &:hover {
    color: #00b0ff;
    background: white;
  }
`;

export const FeedbackActiveButton = styled(FeedbackButton)`
  color: white;
  background-color: #00b0ff;
  border: 0px solid transparent;
`;

export const Content = styled.div`
  display: flex;
  margin: 0px 40px 50px 40px;
  flex-wrap: nowrap;
  padding: 0;
  position: relative;

  @media (max-width: ${mobileWidth}) {
    margin: 50px 25px;
  }
`;

export const SelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 13px;
`;
