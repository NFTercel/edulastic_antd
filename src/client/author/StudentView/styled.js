import styled from "styled-components";
import { FlexContainer } from "@edulastic/common";

export const StyledFlexContainer = styled(FlexContainer)`
  width: 95%;
  margin: 20px auto;
`;

export const StudentButtonDiv = styled.div`
  margin-right: 20px !important;
  .ant-btn-primary {
    background-color: #0e93dc;
  }
`;

const StyledStudentTabButton = styled.a`
  height: 28px;
  padding: 6px 35px;
  font-size: 11px;
  font-weight: 600;
  background-color: ${({ active }) => (active ? "#5196F3" : "#FFFFFF")};
  color: ${({ active }) => (active ? "#FFFFFF" : "#5196F3")};
  &:hover {
    background-color: #5196f3;
    color: #ffffff;
  }
`;

export const AllButton = styled(StyledStudentTabButton)`
  border-radius: 4px 0px 0px 4px;
`;

export const CorrectButton = styled(StyledStudentTabButton)`
  border-radius: 0px;
  margin: 0px 2px;
`;

export const WrongButton = styled(StyledStudentTabButton)`
  border-radius: 0px;
  margin: 0px 2px;
`;

export const PartiallyCorrectButton = styled(StyledStudentTabButton)`
  border-radius: 0px 4px 4px 0px;
`;

const StyledTabButton = styled.a`
  height: 28px;
  padding: 6px 35px;
  font-size: 11px;
  font-weight: 600;
  background-color: ${({ active }) => (active ? "#1774f0" : "#FFFFFF")};
  color: ${({ active }) => (active ? "#FFFFFF" : "#1774f0")};
  &:hover {
    background-color: #1774f0;
    color: #ffffff;
  }
`;

export const GiveOverallFeedBackButton = styled(StyledTabButton)`
  border-radius: 4px;
  display: flex;
  padding: 20px 70px;
  align-items: center;
`;
