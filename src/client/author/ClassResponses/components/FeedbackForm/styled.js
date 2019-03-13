import styled from "styled-components";
import { Card, Button, Input } from "antd";
const { TextArea } = Input;

export const StyledCardTwo = styled(Card)`
  border-radius: 10px;
  box-shadow: 3px 2px 7px lightgray;
  display: inline-block;
  margin: 0px 0 auto 0px
  min-width: 250px;
`;

export const StyledDivSec = styled.div`
  height: 50px;
  border-bottom: 1.4px solid #f7f7f7;
  margin: auto;
  display: flex;
  justify-content: center;
`;

export const ScoreInput = styled(Input)`
  width: 130px;
  height: 40px;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  font-size: 1.8em;
  font-weight: bold;
  display: inline-block;
`;

export const TextPara = styled.p`
  margin-left: 10px;
  font-size: 1.8em;
  font-weight: bold;
  display: inline-block;
`;

export const LeaveDiv = styled.div`
  margin: 30px 0px 20px 0px;
  font-weight: bold;
  color: #545b6b;
  font-size: 0.9em;
`;

export const FeedbackInput = styled(TextArea)`
  width: 100%;
  height: 160px;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  display: inline-block;
`;

export const SolutionButton = styled(Button)`
  font-size: 1em;
  margin: 10px 0px;
  width: 100%;
  padding: 13px 5px 20px;
  color: #00b0ff;
  border-color: #00b0ff;
  height: 45px;
  font-weight: bold;
  &:hover {
    color: #fff;
    background-color: #00b0ff;
  }
`;
