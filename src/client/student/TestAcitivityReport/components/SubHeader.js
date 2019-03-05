import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Col } from "antd";

import Breadcrumb from "../../sharedComponents/Breadcrumb";
import QuestionSelect from "./QuestionSelect.js";

const TestActivitySubHeader = ({ title }) => {
  const breadcrumbData = [{ title: "REPORTS", to: "/home/reports" }, { title: title }];
  return (
    <Container>
      <BreadcrumbContainer>
        <Breadcrumb data={breadcrumbData} />
      </BreadcrumbContainer>
      <QuestionSelectDesktop>
        <QuestionSelect />
      </QuestionSelectDesktop>
    </Container>
  );
};

export default TestActivitySubHeader;

TestActivitySubHeader.propTypes = {
  title: PropTypes.string
};

TestActivitySubHeader.defaultProps = {
  title: "Test"
};

const Container = styled.div`
  padding: 20px 40px 0px 40px;
  display: flex;
`;

const QuestionSelectDesktop = styled(Col)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const BreadcrumbContainer = styled.div`
  flex: 1;
`;
