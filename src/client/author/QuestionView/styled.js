import styled from "styled-components";
import { mobileWidth } from "@edulastic/colors";
import { FlexContainer } from "@edulastic/common";
import { Card, Button } from "antd";

export const PaginationInfo = styled.div`
  font-weight: bold;
  font-size: 10px;
  word-spacing:5px;
  display:inline-block
  margin-left:30px;
  color:#1890ffd9;
`;
export const StyledFlexContainer = styled(FlexContainer)`
  margin: 20px 35px 20px 15px;
`;

export const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1.4px solid #f7f7f7;
  padding-bottom: 15px;
  margin-bottom: 15px;
`;

export const StyledCard = styled(Card)`
  margin: auto;
  width: 95%;
  display: flex;
  justify-content: spance-between;
  height: ${props => (props.isCollapsed ? "5px" : "270px")}
  border-radius: 10px;
  box-shadow: 3px 2px 7px lightgray;
  margin-bottom: 40px;

  ${"ant-card-body"} {
    width: 500px;
    background: red;
  }
`;

export const StyledTitle = styled.p`
  font-size: 16px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.65);
  font-weight: 600;
  padding-left: 62px;
  margin-bottom: 20px;
`;

export const ResponseCard = styled(Card)`
  margin: auto;
  width: 95%;
  display: flex;
  border-radius: 10px;
  box-shadow: 3px 2px 7px lightgray;
  align-items: center;
  margin-top: 15px;
`;

export const CircularDiv = styled.div`
  width: 47px;
  height: 47px;
  border: 2px solid #5cb497;
  display: inline-block;
  border-radius: 128px;
  text-align: center;
  padding-top: 14px;
  color: #343434;
  padding-bottom: 28px;
  margin: 0px 15px 0px 15px;
  font-weight: bold;
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

export const FeedBackCard = styled(Card)`
  margin: 0px 20px 0px 20px;
  width: 73%;
  display: flex;
  height: 550px;
  border-radius: 10px;
  box-shadow: 3px 2px 7px lightgray;
`;

export const OptionDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;
