import styled from "styled-components";
import { mobileWidth } from "@edulastic/colors";
import { FlexContainer } from "@edulastic/common";
import { Card, Button } from "antd";

export const PaginationInfo = styled.div`
  font-weight: bold;
  font-size: 10px;
  word-spacing: 5px;
  display: inline-block;
  margin-left: 30px;
  color: #1890ffd9;
`;
export const StyledFlexContainer = styled(FlexContainer)`
  width: 95%;
  margin: 20px auto;
`;

export const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1.4px solid #f7f7f7;
  padding-bottom: 15px;
  margin-bottom: 15px;
`;

export const StyledCard = styled(Card)`
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  .ant-card-body {
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
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  .ant-card-body {
    padding: 7px 35px;
    display: flex;
    align-items: center;
  }
`;

export const ResponseCardTitle = styled.span`
  color: #7c848e;
  font-size: 11px;
  font-weight: 600;
  line-height: 15px;
  margin-right: 35px;
`;

export const CircularDiv = styled.div`
  background-color: #e7f1fd;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  color: #1774f0;
  font-weight: 600;
  margin-right: 20px;
  align-items: center;
  justify-content: center;
  display: flex;
  &:last-child {
    margin-right: 0px;
  }
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

export const LegendContainer = styled.div`
  display: flex;
  position: absolute;
  top: 24px;
`;
export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 25px;
  &:last-child {
    margin-right: 0px;
  }
`;
export const LegendIcon = styled.div`
  height: 15px;
  width: 15px;
  background-color: ${({ color = "#1FE3A1" }) => color};
  border-radius: 2px;
`;
export const LegendLabel = styled.div`
  margin-left: 8px;
  color: #b1b1b1;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 8px;
`;
