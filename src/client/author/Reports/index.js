import React, { useState, useEffect } from "react";
import { compose } from "redux";

import { StyledContainer, StyledCard } from "./components/styled";
import { Row, Col } from "antd";

import { SingleAssessmentReport } from "./components/singleAssessmentReport";
import { CustomizedHeaderWrapper } from "./components/header";

const Container = props => {
  return (
    <div>
      <CustomizedHeaderWrapper title="Reports" />
      <StyledContainer type="flex" justify="center">
        <Col className="report-category">
          <StyledCard className="single-assessment-reports report">
            <SingleAssessmentReport />
          </StyledCard>
          <StyledCard className="single-assessment-reports report" />
        </Col>
        <Col className="report-category">
          <StyledCard className="multiple-assessment-reports report" />
          <StyledCard className="standards-mastery-reports report" />
          <StyledCard className="engagement-reports report" />
        </Col>
      </StyledContainer>
    </div>
  );
};

const enhance = compose();

export default enhance(Container);
