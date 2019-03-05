import styled from "styled-components";
import { Progress } from "antd";
import { IconPlus } from "@edulastic/icons";
import AssignmentContentWrapper from "../styled/assignmentContentWrapper";

export const AssignmentContentWrap = styled(AssignmentContentWrapper)`
  padding-top: 32px;
  padding-bottom: 32px;
`;

export const SkillReportContainer = styled.div`
  padding: 30px 50px;
  @media screen and (max-width: 767px) {
    padding: 16px 26px;
  }
`;

export const SummaryTitle = styled.div`
  font-size: ${props => props.theme.skillReport.skillReportTitleFontSize};
  font-weight: 600;
  color: ${props => props.theme.skillReport.skillReportTitleColor};
  letter-spacing: 0.3px;
  margin-bottom: 24px;
`;

export const Circle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background: ${props =>
    props.percentage > 30 ? props.theme.skillReport.yellowColor : props.theme.skillReport.redColor};
  margin-left: 18px;
`;

export const Title = styled.div`
  display: flex;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    flex-direction: column;
    position: relative;
  }
`;

export const RelationTitle = styled.div`
  flex: 1;
  font-size: ${props => props.theme.skillReport.RelationTitleFontSize};
  font-weight: 600;
  letter-spacing: 0.3px;
  color: ${props => props.theme.skillReport.RelationTitleColor};
  margin-bottom: 24px;
  @media screen and (max-width: 767px) {
    width: 90%;
  }
`;

export const GradeTag = styled.div`
  background: ${props => props.theme.skillReport.gradeColumnTagBgColor};
  height: 23.5px;
  color: ${props => props.theme.skillReport.gradeColumnTagColor};
  font-size: ${props => props.theme.skillReport.gradeColumnTagTextSize};
  font-weight: bold;
  letter-spacing: 0.2px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IconClose = styled.div`
  position: relative;
  cursor: pointer;
  width: 17.7px;
  height: 3.4px;
  background-color: ${props => props.theme.skillReport.collapseIconColor};
  margin-top: 10px;
  @media screen and (max-width: 767px) {
    position: absolute;
    top: 0px;
    right: 0px;
  }
`;

export const IconOpen = styled(IconPlus)`
  width: 16px;
  height: 16px;
  margin-top: 5px;
  fill: ${props => props.theme.skillReport.expandIconColor};
  @media screen and (max-width: 767px) {
    position: absolute;
    top: 0px;
    right: 0px;
  }
`;

export const StyledScoreProgress = styled(Progress)`
  width: 220px;
  margin-right: 40px;
  height: 16px;
  .ant-progress-inner {
    height: 16px;
  }
  .ant-progress-bg {
    height: 16px !important;
    background: ${props =>
    (props.percent >= 50
      ? props.theme.skillReport.greenColor
      : props.percent >= 30
        ? props.theme.skillReport.yellowColor
        : props.theme.skillReport.redColor)};
  }
`;

export const StyledProgress = styled(Progress)`
  height: 16px;
  .ant-progress-inner {
    height: 16px;
  }
  .ant-progress-bg {
    height: 16px !important;
    background: ${props =>
    (props.percent >= 50
      ? props.theme.skillReport.greenColor
      : props.percent >= 30
        ? props.theme.skillReport.yellowColor
        : props.theme.skillReport.redColor)};
  }
`;
