import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withNamespaces } from "@edulastic/localization";
import styled from "styled-components";
import * as S from "./styled";
import StyledTable from "../styled/Table";
import TableSection from "./SkillTableSection";

const computeColumns = t => [
  {
    title: t("common.tableHeaderTitleDomains"),
    dataIndex: "domain",
    sorter: (a, b) => a.domain.length - b.domain.length,
    render: domain => `${domain}`,
    width: "40%"
  },
  {
    title: t("common.tableHeaderTitleTotalQuestions"),
    dataIndex: "total",
    sorter: (a, b) => a.total - b.total,
    render: total => `${total}`,
    width: "20%"
  },
  {
    title: t("common.tableHeaderTitlePercentage"),
    dataIndex: "percentage",
    sorter: (a, b) => a.percentage - b.percentage,
    render: percentage => (
      <div style={{ display: "flex", alignItems: "center" }}>
        {Number.isNaN(percentage) ? "-" : `${Number(percentage.toFixed(1))}%`}
        {!Number.isNaN(percentage) && <Circle percentage={percentage} />}
      </div>
    ),
    width: "20%"
  },
  {
    title: t("common.tableHeaderTitleHints"),
    dataIndex: "hints",
    sorter: (a, b) => a.hints - b.hints,
    render: hints => `${hints}`,
    width: "20%"
  }
];

const SkillReportMainContent = ({ skillReport, t }) => {
  const summaryColumns = computeColumns(t);
  let sumData = [];
  // console.log('skillReport',skillReport);
  if (skillReport) {
    const getDomainScoreDetails = id =>
      skillReport.reports.reportData.domainLevel.filter(item => item.domain_id === id);
    sumData = skillReport.reports.curriculum.domains.map(domain => {
      const reportData = getDomainScoreDetails(domain._id)[0] || {};
      const percentage = (reportData.score / reportData.max_points) * 100;
      return {
        domain: domain.description || "-",
        standards: domain.standards || "-",
        total: reportData.total_questions || "-",
        hints: reportData.hints || "-",
        percentage
      };
    });
  }
  return (
    <S.SkillReportContainer>
      <S.AssignmentContentWrap>
        <S.SummaryTitle>{t("common.skillSummary")}</S.SummaryTitle>
        <StyledTable columns={summaryColumns} dataSource={sumData} pagination={false} />
      </S.AssignmentContentWrap>
      {sumData.map((summary, index) => (
        <TableSection summary={summary} dataSource={sumData} skillReport={skillReport} key={index} />
      ))}
    </S.SkillReportContainer>
  );
};

SkillReportMainContent.propTypes = {
  skillReport: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

const enhance = compose(withNamespaces("reports"));

export default enhance(SkillReportMainContent);

const Circle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background: ${props =>
    props.percentage >= 50
      ? props.theme.skillReport.greenColor
      : props.percentage >= 30
      ? props.theme.skillReport.yellowColor
      : props.theme.skillReport.redColor};
  }
  margin-left: 18px;
`;
