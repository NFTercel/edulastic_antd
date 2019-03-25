import React from "react";
import styled from "styled-components";

import { grey } from "@edulastic/colors";

import { LinkItem } from "./linkItem";
import { BoxHeading } from "../../common/components/boxHeading";

export const SingleAssessmentReport = props => {
  const links = [
    {
      title: "Assessment Summary",
      location: "/author/reports/assessment-summary/test/5c90d974a649cb81bc5d4ca2?districtId=5c9089b1a649cb81bc398b1f"
    },
    { title: "Peer Performance", location: "/author/reports/" },
    { title: "Question Analysis", location: "/author/reports/" },
    {
      title: "Response Frequency",
      location: "/author/reports/response-frequency/test/5c7f99baa649cb81bcd007f0?districtId=5c7f9632a649cb81bccd97f1"
    },
    { title: "Performance by Standards", location: "/author/reports/" },
    { title: "Performance by Students", location: "/author/reports/" }
  ];

  return (
    <div>
      <BoxHeading heading={"Single Assessment Report"} iconType={"bar-chart"} />
      <StyledP>
        View deep analysis of a single assessment. Compare class level performance, view item analysis, diagnose
        difficult items and areas of misunderstanding.
      </StyledP>
      {links.map((data, index) => {
        return <LinkItem key={data.title} data={data} />;
      })}
    </div>
  );
};

const StyledP = styled.p`
  border-bottom: solid 1px ${grey};
`;
